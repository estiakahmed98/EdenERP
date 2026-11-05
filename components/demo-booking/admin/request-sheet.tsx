"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  Building2,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  Trash2,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  DEMO_MODULES,
  DEMO_STATUSES,
  type DemoRequestRow,
  type DemoRequestStatus,
} from "@/lib/demo-requests/validation";
import { STATUS_META, formatDate, whatsappLink } from "./status";

export type RequestFormValues = {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  modules: string[];
  message: string;
  status: DemoRequestStatus;
  adminNotes: string;
};

export type FieldErrors = Partial<Record<keyof RequestFormValues, string>>;

const EMPTY: RequestFormValues = {
  fullName: "",
  companyName: "",
  phone: "",
  email: "",
  modules: [],
  message: "",
  status: "NEW",
  adminNotes: "",
};

const fromRow = (row: DemoRequestRow): RequestFormValues => ({
  fullName: row.fullName,
  companyName: row.companyName,
  phone: row.phone,
  email: row.email ?? "",
  modules: row.modules,
  message: row.message ?? "",
  status: row.status,
  adminNotes: row.adminNotes,
});

function Field({
  id,
  label,
  icon: Icon,
  error,
  children,
}: {
  id: string;
  label: string;
  icon?: typeof User;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-semibold text-muted-foreground">
        {Icon && <Icon className="size-3.5" aria-hidden="true" />}
        {label}
      </Label>
      {children}
      {error && (
        <p className="text-xs font-medium text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function RequestSheet({
  open,
  row,
  saving,
  errors,
  onClose,
  onSubmit,
  onDelete,
}: {
  open: boolean;
  /** `null` = create a new request. */
  row: DemoRequestRow | null;
  saving: boolean;
  errors: FieldErrors;
  onClose: () => void;
  onSubmit: (values: RequestFormValues) => void;
  onDelete?: () => void;
}) {
  const [values, setValues] = useState<RequestFormValues>(EMPTY);
  const creating = row === null;

  useEffect(() => {
    if (open) setValues(row ? fromRow(row) : EMPTY);
  }, [open, row]);

  const set = <K extends keyof RequestFormValues>(
    key: K,
    value: RequestFormValues[K],
  ) => setValues((current) => ({ ...current, [key]: value }));

  const toggleModule = (name: string) =>
    set(
      "modules",
      values.modules.includes(name)
        ? values.modules.filter((m) => m !== name)
        : [...values.modules, name],
    );

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!saving) onSubmit(values);
  }

  return (
    <Sheet open={open} onOpenChange={(next) => !next && !saving && onClose()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-xl"
      >
        <SheetHeader className="border-b border-border p-6 text-left">
          <SheetTitle className="text-lg font-bold">
            {creating ? "New demo request" : row.fullName}
          </SheetTitle>
          <SheetDescription>
            {creating
              ? "Add a lead you received by phone, email or in person."
              : `${row.companyName} · received ${formatDate(row.createdAt)}`}
          </SheetDescription>

          {!creating && (
            <div className="flex flex-wrap gap-2 pt-2">
              <Button asChild variant="outline" size="sm">
                <a href={`tel:${row.phone}`}>
                  <Phone /> Call
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href={whatsappLink(row.phone)} target="_blank" rel="noreferrer">
                  <MessageCircle /> WhatsApp
                </a>
              </Button>
              {row.email && (
                <Button asChild variant="outline" size="sm">
                  <a href={`mailto:${row.email}`}>
                    <Mail /> Email
                  </a>
                </Button>
              )}
            </div>
          )}
        </SheetHeader>

        <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
          <fieldset
            disabled={saving}
            className="min-h-0 flex-1 space-y-6 overflow-y-auto p-6"
          >
            {/* Status */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground">
                Status
              </Label>
              <div
                role="radiogroup"
                aria-label="Status"
                className="grid grid-cols-2 gap-2"
              >
                {DEMO_STATUSES.map((value) => {
                  const meta = STATUS_META[value];
                  const Icon = meta.icon;
                  const active = values.status === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => set("status", value)}
                      className={cn(
                        "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-colors",
                        active
                          ? meta.active
                          : "border-border bg-card text-muted-foreground hover:bg-muted",
                      )}
                    >
                      <Icon className="size-4 shrink-0" aria-hidden="true" />
                      {meta.label}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                {STATUS_META[values.status].hint}
              </p>
            </div>

            {/* Contact */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="rq-name" label="Full name" icon={User} error={errors.fullName}>
                <Input
                  id="rq-name"
                  value={values.fullName}
                  maxLength={120}
                  required
                  autoComplete="off"
                  aria-invalid={!!errors.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                />
              </Field>
              <Field
                id="rq-company"
                label="Company"
                icon={Building2}
                error={errors.companyName}
              >
                <Input
                  id="rq-company"
                  value={values.companyName}
                  maxLength={160}
                  required
                  autoComplete="off"
                  aria-invalid={!!errors.companyName}
                  onChange={(e) => set("companyName", e.target.value)}
                />
              </Field>
              <Field id="rq-phone" label="Phone" icon={Phone} error={errors.phone}>
                <Input
                  id="rq-phone"
                  type="tel"
                  value={values.phone}
                  maxLength={40}
                  required
                  placeholder="+8801XXXXXXXXX"
                  autoComplete="off"
                  aria-invalid={!!errors.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </Field>
              <Field id="rq-email" label="Email" icon={Mail} error={errors.email}>
                <Input
                  id="rq-email"
                  type="email"
                  value={values.email}
                  maxLength={254}
                  placeholder="Optional"
                  autoComplete="off"
                  aria-invalid={!!errors.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </Field>
            </div>

            {/* Modules */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground">
                Interested modules
              </Label>
              <div className="flex flex-wrap gap-2">
                {DEMO_MODULES.map((name) => {
                  const on = values.modules.includes(name);
                  return (
                    <button
                      key={name}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleModule(name)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                        on
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            </div>

            <Field id="rq-message" label="Client message" error={errors.message}>
              <Textarea
                id="rq-message"
                rows={3}
                maxLength={2000}
                value={values.message}
                placeholder="What does the client want to see?"
                onChange={(e) => set("message", e.target.value)}
              />
            </Field>

            <Field id="rq-notes" label="Internal follow-up notes" error={errors.adminNotes}>
              <Textarea
                id="rq-notes"
                rows={4}
                maxLength={4000}
                value={values.adminNotes}
                placeholder="Only visible to admins — call outcomes, next steps…"
                onChange={(e) => set("adminNotes", e.target.value)}
              />
            </Field>
          </fieldset>

          <SheetFooter className="flex-row items-center justify-between gap-2 border-t border-border bg-card p-4 sm:p-6">
            {!creating && onDelete ? (
              <Button
                type="button"
                variant="ghost"
                disabled={saving}
                onClick={onDelete}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 /> Delete
              </Button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={saving}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="animate-spin" />}
                {saving ? "Saving…" : creating ? "Create request" : "Save changes"}
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
