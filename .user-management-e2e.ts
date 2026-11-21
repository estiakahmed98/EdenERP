import 'dotenv/config';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import bcrypt from 'bcryptjs';
import { db } from './lib/db';

const { chromium, request } = await import(pathToFileURL(join(tmpdir(), 'eden-user-management-browser/node_modules/playwright/index.mjs')).href);
const origin = 'http://localhost:3000';
const marker = `um-${randomUUID().slice(0, 8)}`;
const password = `Test-${randomUUID()}`;
const newPassword = `Reset-${randomUUID()}`;
const actorEmail = `${marker}-admin@example.invalid`;
const memberEmail = `${marker}-member@example.invalid`;
const managedIds: string[] = [];
const contexts: any[] = [];
let browser: any;

async function login(email: string, secret: string, expected = 200) {
  const ctx = await request.newContext({ baseURL: origin, timeout: 120_000 });
  contexts.push(ctx);
  const csrf = await (await ctx.get('/api/auth/csrf')).json();
  const response = await ctx.post('/api/auth/callback/credentials', { form: { csrfToken: csrf.csrfToken, email, password: secret, json: 'true', callbackUrl: '/admin/users' } });
  assert.equal(response.status(), expected);
  return ctx;
}

async function json(ctx: any, method: string, path: string, data?: unknown, expected = 200) {
  const response = await ctx.fetch(path, { method, data, headers: { Origin: origin, 'Content-Type': 'application/json' } });
  const body = await response.json();
  assert.equal(response.status(), expected, `${method} ${path}: ${JSON.stringify(body)}`);
  return body;
}

try {
  const actor = await db.user.create({ data: { name: 'User Management Test Admin', email: actorEmail, role: 'ADMIN', passwordHash: await bcrypt.hash(password, 12) } });
  managedIds.push(actor.id);
  const anonymous = await request.newContext({ baseURL: origin, timeout: 120_000 });
  contexts.push(anonymous);
  await json(anonymous, 'GET', '/api/admin/users', undefined, 401);
  const admin = await login(actorEmail, password);
  const initial = await json(admin, 'GET', '/api/admin/users');
  assert.ok(Array.isArray(initial.users));
  assert.ok(!JSON.stringify(initial).includes('passwordHash'));
  assert.ok(!JSON.stringify(initial).includes('sessionVersion'));
  console.log('PASS: anonymous denied, real credential login and private list allowlist');

  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: await admin.storageState(), viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const pageErrors: string[] = [];
  page.on('pageerror', (error: Error) => pageErrors.push(error.message));
  await page.goto(`${origin}/admin/users`, { timeout: 120_000 });
  await page.getByRole('heading', { name: 'User management', exact: true }).waitFor();
  await page.getByRole('button', { name: 'Add user', exact: true }).click();
  await page.getByLabel('Full name', { exact: true }).fill('Browser Test Member');
  await page.getByLabel('Email address', { exact: true }).fill(memberEmail);
  await page.getByLabel('Phone (optional)', { exact: true }).fill('+880 1700 000000');
  await page.getByLabel('Password', { exact: true }).fill(password);
  await page.getByLabel('Confirm password', { exact: true }).fill(password);
  await page.getByRole('dialog').getByRole('button', { name: 'Add user', exact: true }).click();
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  await page.getByRole('cell').filter({ hasText: memberEmail }).waitFor();
  const member = await db.user.findUniqueOrThrow({ where: { email: memberEmail } });
  managedIds.push(member.id);
  let current = (await json(admin, 'GET', `/api/admin/users?q=${memberEmail}`)).users[0];
  assert.equal(current.email, memberEmail);
  assert.ok(await bcrypt.compare(password, member.passwordHash!));
  console.log('PASS: browser create form → API → PostgreSQL → refreshed table');

  const payload = { name: current.name, email: current.email, phone: current.phone || '', role: current.role, isActive: current.isActive };
  await json(admin, 'POST', '/api/admin/users', { ...payload, password }, 409);
  const badOrigin = await admin.post('/api/admin/users', { data: { ...payload, password }, headers: { Origin: 'https://foreign.invalid' } });
  assert.equal(badOrigin.status(), 403);
  const self = (await json(admin, 'GET', `/api/admin/users?q=${actorEmail}`)).users[0];
  await json(admin, 'PATCH', `/api/admin/users/${actor.id}`, { isActive: false, updatedAt: self.updatedAt }, 409);
  await json(admin, 'DELETE', `/api/admin/users/${actor.id}`, { email: actorEmail, updatedAt: self.updatedAt }, 409);
  const ordinary = await login(memberEmail, password);
  await json(ordinary, 'GET', '/api/admin/users', undefined, 403);
  console.log('PASS: duplicate email, cross-origin, self-removal and non-admin requests blocked');

  // Login updates lastLoginAt, so re-read the optimistic concurrency version.
  current = (await json(admin, 'GET', `/api/admin/users?q=${memberEmail}`)).users[0];
  const oldVersion = current.updatedAt;
  current = (await json(admin, 'PATCH', `/api/admin/users/${member.id}`, { ...payload, role: 'ADMIN', updatedAt: current.updatedAt })).user;
  await json(ordinary, 'GET', '/api/admin/users', undefined, 401);
  const promoted = await login(memberEmail, password);
  await json(promoted, 'GET', '/api/admin/users');
  current = (await json(admin, 'GET', `/api/admin/users?q=${memberEmail}`)).users[0];
  await json(admin, 'PATCH', `/api/admin/users/${member.id}`, { ...payload, updatedAt: oldVersion }, 409);
  current = (await json(admin, 'PATCH', `/api/admin/users/${member.id}`, { password: newPassword, updatedAt: current.updatedAt })).user;
  await json(promoted, 'GET', '/api/admin/users', undefined, 401);
  const oldLogin = await login(memberEmail, password, 401);
  assert.ok(!(await (await oldLogin.get('/api/auth/session')).json()).user);
  const resetLogin = await login(memberEmail, newPassword);
  await json(resetLogin, 'GET', '/api/admin/users');
  current = (await json(admin, 'GET', `/api/admin/users?q=${memberEmail}`)).users[0];
  current = (await json(admin, 'PATCH', `/api/admin/users/${member.id}`, { isActive: false, updatedAt: current.updatedAt })).user;
  await json(resetLogin, 'GET', '/api/admin/users', undefined, 401);
  const inactiveLogin = await login(memberEmail, newPassword, 401);
  assert.ok(!(await (await inactiveLogin.get('/api/auth/session')).json()).user);
  current = (await json(admin, 'PATCH', `/api/admin/users/${member.id}`, { isActive: true, updatedAt: current.updatedAt })).user;
  const activeLogin = await login(memberEmail, newPassword);
  await json(activeLogin, 'GET', '/api/admin/users');
  console.log('PASS: role promotion, stale edits, password reset, session revocation and activation lifecycle');

  await page.getByRole('textbox', { name: 'Search name, email or phone…' }).fill(memberEmail);
  await page.getByRole('button', { name: 'Actions for Browser Test Member' }).click();
  await page.getByRole('menuitem', { name: 'Edit user', exact: true }).click();
  await page.getByLabel('Full name', { exact: true }).fill('Updated Browser Member');
  await page.getByRole('dialog').getByRole('button', { name: 'Save changes', exact: true }).click();
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  await page.getByRole('button', { name: 'Actions for Updated Browser Member' }).waitFor();
  await page.screenshot({ path: join(tmpdir(), 'eden-users-desktop.png'), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForFunction(() => document.documentElement.scrollWidth <= window.innerWidth);
  await page.screenshot({ path: join(tmpdir(), 'eden-users-mobile.png'), fullPage: true });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false);
  console.log('PASS: browser edit, desktop rendering and mobile page width');

  await context.addCookies([{ name: 'NEXT_LOCALE', value: 'bn', domain: 'localhost', path: '/' }]);
  await page.reload();
  await page.getByRole('heading', { name: 'ইউজার ম্যানেজমেন্ট', exact: true }).waitFor();
  await page.getByRole('button', { name: 'ইউজার যোগ করুন', exact: true }).click();
  await page.getByLabel('পুরো নাম', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'বাতিল', exact: true }).last().click();
  assert.deepEqual(pageErrors, []);
  console.log('PASS: Bengali page and localized form, no uncaught browser errors');

  await context.addCookies([{ name: 'NEXT_LOCALE', value: 'en', domain: 'localhost', path: '/' }]);
  await page.reload();
  await page.getByRole('textbox', { name: 'Search name, email or phone…' }).fill(memberEmail);
  await page.getByRole('button', { name: 'Actions for Updated Browser Member' }).click();
  await page.getByRole('menuitem', { name: 'Delete user', exact: true }).click();
  await page.getByLabel(`Type ${memberEmail} to confirm deletion`).fill(memberEmail);
  await page.getByRole('dialog').getByRole('button', { name: 'Delete user', exact: true }).click();
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  assert.equal(await db.user.count({ where: { id: member.id } }), 0);
  console.log('PASS: browser confirmation → permanent deletion');

  const bulk = Array.from({ length: 17 }, (_, i) => ({ id: `${marker}-${i}`, name: `${marker} Page ${i}`, email: `${marker}-page-${i}@example.invalid` }));
  managedIds.push(...bulk.map((u) => u.id));
  await db.user.createMany({ data: bulk });
  const second = await json(admin, 'GET', `/api/admin/users?q=${marker}-page-&page=2`);
  assert.equal(second.total, 17);
  assert.equal(second.page, 2);
  assert.equal(second.users.length, 2);
  const clamped = await json(admin, 'GET', `/api/admin/users?q=${marker}-page-&page=99`);
  assert.equal(clamped.page, 2);
  console.log('PASS: search, database pagination and out-of-range page clamping');
} finally {
  await browser?.close();
  for (const context of contexts) await context.dispose();
  await db.user.deleteMany({ where: { id: { in: managedIds } } });
  await db.$disconnect();
  console.log('Temporary test accounts cleaned up.');
}
