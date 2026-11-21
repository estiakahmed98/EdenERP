"use client";

import { useEffect, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, KeyRound, Loader2, MoreHorizontal, Pencil, Plus, Power, RefreshCw, Search, ShieldCheck, Trash2, UserCheck, Users, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { UserList, UserQuery } from "@/lib/users/validation";
import UserDialog, { type UserAction } from "./UserDialog";

const selectClass = "h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function UserManagement({ currentUserId }: { currentUserId: string }) {
  const t = useTranslations("admin.users");
  const format = useFormatter();
  const [query, setQuery] = useState<UserQuery>({ q: "", role: "ALL", status: "ALL", page: 1 });
  const [data, setData] = useState<UserList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  const [action, setAction] = useState<UserAction | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ ...query, page: String(query.page) });
        const response = await fetch(`/api/admin/users?${params}`, { cache: "no-store", signal: controller.signal });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "server");
        if (!controller.signal.aborted) setData(result);
      } catch (err) {
        if (!controller.signal.aborted) { setData(null); setError(err instanceof Error ? err.message : "server"); }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query, revision]);

  function filter(patch: Partial<UserQuery>) {
    setLoading(true);
    setQuery((previous) => ({ ...previous, ...patch, page: 1 }));
  }

  const stats = [
    { key: "total", icon: Users, value: data?.stats.total, color: "text-primary bg-primary/10" },
    { key: "active", icon: UserCheck, value: data?.stats.active, color: "text-emerald-600 bg-emerald-500/10" },
    { key: "admins", icon: ShieldCheck, value: data?.stats.admins, color: "text-blue-600 bg-blue-500/10" },
    { key: "inactive", icon: UserX, value: data?.stats.inactive, color: "text-amber-600 bg-amber-500/10" },
  ];
  const page = data?.page ?? query.page;
  const pages = Math.max(1, Math.ceil((data?.total ?? 0) / (data?.pageSize ?? 15)));
  const date = (value: string | null) => value ? format.dateTime(new Date(value), { dateStyle: "medium", timeZone: "Asia/Dhaka" }) : t("never");

  return (
    <div className="mx-auto space-y-6 p-4 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">{t("eyebrow")}</p>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t("title")}</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{t("description")}</p>
        </div>
        <Button onClick={() => setAction({ kind: "create" })}><Plus aria-hidden="true" />{t("addUser")}</Button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(({ key, icon: Icon, value, color }) => (
          <div key={key} className="flex items-center gap-4 rounded-xl border bg-card p-4 md:p-5">
            <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${color}`}><Icon className="size-5" aria-hidden="true" /></span>
            <div><p className="text-xs text-muted-foreground">{t(`stats.${key}`)}</p><p className="mt-1 text-2xl font-semibold tabular-nums">{value === undefined ? "—" : format.number(value)}</p></div>
          </div>
        ))}
      </div>

      <section aria-label={t("directory")} className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
          <div><h2 className="font-semibold">{t("directory")}</h2><p className="mt-1 text-xs text-muted-foreground">{t("directoryHint")}</p></div>
          <Button variant="outline" size="sm" disabled={loading} onClick={() => { setLoading(true); setRevision((v) => v + 1); }}><RefreshCw className={loading ? "animate-spin" : ""} aria-hidden="true" />{t("refresh")}</Button>
        </div>
        <div className="flex flex-wrap gap-3 border-b bg-muted/20 p-4">
          <div className="relative min-w-48 flex-1">
            <Search className="pointer-events-none absolute start-3 top-3 size-4 text-muted-foreground" aria-hidden="true" />
            <Input className="h-10 ps-9" aria-label={t("search")} placeholder={t("search")} maxLength={100} value={query.q} onChange={(event) => filter({ q: event.target.value })} />
          </div>
          <select className={selectClass} aria-label={t("role")} value={query.role} onChange={(event) => filter({ role: event.target.value as UserQuery["role"] })}>
            <option value="ALL">{t("allRoles")}</option><option value="ADMIN">{t("roles.ADMIN")}</option><option value="USER">{t("roles.USER")}</option>
          </select>
          <select className={selectClass} aria-label={t("status")} value={query.status} onChange={(event) => filter({ status: event.target.value as UserQuery["status"] })}>
            <option value="ALL">{t("allStatuses")}</option><option value="ACTIVE">{t("active")}</option><option value="INACTIVE">{t("inactive")}</option>
          </select>
        </div>

        {error ? (
          <div role="alert" className="space-y-3 p-8 text-center"><p className="text-destructive">{t(t.has(`errors.${error}`) ? `errors.${error}` : "errors.server")}</p><Button variant="outline" onClick={() => setRevision((v) => v + 1)}>{t("retry")}</Button></div>
        ) : loading ? (
          <div role="status" className="flex min-h-72 items-center justify-center gap-2 text-sm text-muted-foreground"><Loader2 className="size-5 animate-spin" aria-hidden="true" />{t("loading")}</div>
        ) : !data?.users.length ? (
          <div className="flex min-h-72 flex-col items-center justify-center gap-3 p-6 text-center"><Users className="size-10 text-muted-foreground/50" aria-hidden="true" /><h3 className="font-semibold">{t("empty")}</h3><p className="text-sm text-muted-foreground">{t("emptyHint")}</p><Button variant="outline" onClick={() => filter({ q: "", role: "ALL", status: "ALL" })}>{t("clearFilters")}</Button></div>
        ) : (
          <Table>
            <TableHeader><TableRow><TableHead className="ps-5">{t("user")}</TableHead><TableHead>{t("role")}</TableHead><TableHead>{t("status")}</TableHead><TableHead>{t("joined")}</TableHead><TableHead>{t("lastLogin")}</TableHead><TableHead className="pe-5 text-end">{t("actions")}</TableHead></TableRow></TableHeader>
            <TableBody>{data.users.map((user) => {
              const self = user.id === currentUserId;
              return (
                <TableRow key={user.id}>
                  <TableCell className="ps-5 py-4"><div className="flex items-center gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">{(user.name || user.email).slice(0, 2).toUpperCase()}</span><div className="min-w-0"><div className="flex items-center gap-2"><span className="max-w-52 truncate font-medium">{user.name || t("unnamed")}</span>{self && <Badge variant="outline">{t("you")}</Badge>}</div><p className="max-w-64 truncate text-xs text-muted-foreground" dir="ltr">{user.email}</p>{user.phone && <p className="mt-1 text-xs text-muted-foreground" dir="ltr">{user.phone}</p>}</div></div></TableCell>
                  <TableCell><Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>{user.role === "ADMIN" && <ShieldCheck className="size-3" aria-hidden="true" />}{t(`roles.${user.role}`)}</Badge></TableCell>
                  <TableCell><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${user.isActive ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`}><span className={`size-1.5 rounded-full ${user.isActive ? "bg-emerald-500" : "bg-muted-foreground"}`} />{t(user.isActive ? "active" : "inactive")}</span></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{date(user.createdAt)}</TableCell><TableCell className="text-xs text-muted-foreground">{date(user.lastLoginAt)}</TableCell>
                  <TableCell className="pe-5 text-end"><DropdownMenu><DropdownMenuTrigger asChild><Button size="icon" variant="ghost" aria-label={t("actionsFor", { name: user.name || user.email })}><MoreHorizontal aria-hidden="true" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => setAction({ kind: "edit", user })}><Pencil aria-hidden="true" />{t("edit")}</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setAction({ kind: "password", user })}><KeyRound aria-hidden="true" />{t("resetPassword")}</DropdownMenuItem>
                    <DropdownMenuItem disabled={self} onSelect={() => setAction({ kind: "status", user })}><Power aria-hidden="true" />{t(user.isActive ? "deactivate" : "activate")}</DropdownMenuItem>
                    <DropdownMenuSeparator /><DropdownMenuItem className="text-destructive focus:text-destructive" disabled={self} onSelect={() => setAction({ kind: "delete", user })}><Trash2 aria-hidden="true" />{t("delete")}</DropdownMenuItem>
                  </DropdownMenuContent></DropdownMenu></TableCell>
                </TableRow>
              );
            })}</TableBody>
          </Table>
        )}
        {data && !error && <div className="flex flex-wrap items-center justify-between gap-3 border-t px-5 py-4 text-xs text-muted-foreground"><p aria-live="polite">{t("results", { from: data.total ? (page - 1) * data.pageSize + 1 : 0, to: Math.min(page * data.pageSize, data.total), total: data.total })}</p><div className="flex items-center gap-2"><Button size="icon" variant="outline" aria-label={t("previous")} disabled={loading || page <= 1} onClick={() => { setLoading(true); setQuery((v) => ({ ...v, page: page - 1 })); }}><ChevronLeft aria-hidden="true" /></Button><span>{t("page", { page, pages })}</span><Button size="icon" variant="outline" aria-label={t("next")} disabled={loading || page >= pages} onClick={() => { setLoading(true); setQuery((v) => ({ ...v, page: page + 1 })); }}><ChevronRight aria-hidden="true" /></Button></div></div>}
      </section>
      <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{t("securityNote")}</p>
      {action && <UserDialog action={action} currentUserId={currentUserId} onClose={() => setAction(null)} onSaved={() => { setAction(null); setLoading(true); setRevision((v) => v + 1); }} />}
    </div>
  );
}
