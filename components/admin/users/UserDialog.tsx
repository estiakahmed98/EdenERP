"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createUserSchema, passwordSchema, updateUserSchema, type ManagedUser } from "@/lib/users/validation";

export type UserAction = { kind: "create" } | { kind: "edit" | "password" | "status" | "delete"; user: ManagedUser };

export default function UserDialog({ action, currentUserId, onClose, onSaved }: {
  action: UserAction; currentUserId: string; onClose: () => void; onSaved: () => void;
}) {
  const t = useTranslations("admin.users");
  const user = action.kind === "create" ? null : action.user;
  const self = user?.id === currentUserId;
  const [profile, setProfile] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", role: user?.role || "USER", isActive: user?.isActive ?? true });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const isProfile = action.kind === "create" || action.kind === "edit";
  const isPassword = action.kind === "create" || action.kind === "password";
  const title = action.kind === "status" ? (user?.isActive ? "deactivate" : "activate") : ({ create: "addUser", edit: "edit", password: "resetPassword", delete: "delete" } as const)[action.kind];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError("");
    const input = action.kind === "create" ? { ...profile, password } : { ...profile, updatedAt: user?.updatedAt };
    if (isProfile) {
      const result = (action.kind === "create" ? createUserSchema : updateUserSchema).safeParse(input);
      if (!result.success) {
        setFields(Object.fromEntries(result.error.issues.map((issue) => [String(issue.path[0]), t(`validation.${String(issue.path[0])}`)])));
        return;
      }
    }
    if (isPassword && (!passwordSchema.safeParse(password).success || password !== confirmPassword)) {
      setFields({ password: !passwordSchema.safeParse(password).success ? t("validation.password") : "", confirmPassword: password !== confirmPassword ? t("validation.confirmPassword") : "" });
      return;
    }
    setFields({});
    setBusy(true);
    try {
      const body = action.kind === "create" ? input
        : action.kind === "edit" ? input
        : action.kind === "password" ? { password, updatedAt: user?.updatedAt }
        : action.kind === "delete" ? { email: confirmation, updatedAt: user?.updatedAt }
        : { isActive: !user?.isActive, updatedAt: user?.updatedAt };
      const response = await fetch(action.kind === "create" ? "/api/admin/users" : `/api/admin/users/${user?.id}`, {
        method: action.kind === "create" ? "POST" : action.kind === "delete" ? "DELETE" : "PATCH",
        headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "server");
      toast.success(t("saved"));
      if (self && (action.kind === "password" || (action.kind === "edit" && profile.email.trim().toLowerCase() !== user?.email))) {
        await signOut({ callbackUrl: "/auth/signin" });
        return;
      }
      onSaved();
    } catch (err) {
      const code = err instanceof Error ? err.message : "server";
      setError(t(t.has(`errors.${code}`) ? `errors.${code}` : "errors.server"));
    } finally { setBusy(false); }
  }

  const inputClass = "mt-1.5";
  return (
    <Dialog open onOpenChange={(open) => { if (!open && !busy) onClose(); }}>
      <DialogContent closeLabel={t("cancel")} showCloseButton={!busy} className="max-h-[90dvh] overflow-y-auto sm:max-w-lg" onInteractOutside={(event) => { if (busy) event.preventDefault(); }} onEscapeKeyDown={(event) => { if (busy) event.preventDefault(); }}>
        <DialogHeader><DialogTitle>{t(title)}</DialogTitle><DialogDescription>{t(action.kind === "create" ? "createHint" : action.kind === "edit" ? "editHint" : action.kind === "password" ? "passwordHint" : action.kind === "delete" ? "deleteHint" : user?.isActive ? "deactivateHint" : "activateHint", { email: user?.email || "" })}</DialogDescription></DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <fieldset disabled={busy} className="space-y-4 disabled:opacity-70">
            {isProfile && <>
              <div><Label htmlFor="user-name">{t("name")}</Label><Input id="user-name" className={inputClass} value={profile.name} maxLength={100} required autoComplete="name" aria-invalid={!!fields.name} aria-describedby={fields.name ? "error-name" : undefined} onChange={(event) => setProfile({ ...profile, name: event.target.value })} />{fields.name && <p id="error-name" className="mt-1 text-xs text-destructive">{fields.name}</p>}</div>
              <div><Label htmlFor="user-email">{t("email")}</Label><Input id="user-email" className={inputClass} type="email" dir="ltr" value={profile.email} maxLength={254} required autoComplete="email" aria-invalid={!!fields.email} aria-describedby={fields.email ? "error-email" : undefined} onChange={(event) => setProfile({ ...profile, email: event.target.value })} />{fields.email && <p id="error-email" className="mt-1 text-xs text-destructive">{fields.email}</p>}</div>
              <div><Label htmlFor="user-phone">{t("phone")}</Label><Input id="user-phone" className={inputClass} type="tel" dir="ltr" value={profile.phone} maxLength={40} autoComplete="tel" aria-invalid={!!fields.phone} aria-describedby={fields.phone ? "error-phone" : undefined} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} />{fields.phone && <p id="error-phone" className="mt-1 text-xs text-destructive">{fields.phone}</p>}</div>
              <div className="grid grid-cols-2 gap-4"><div><Label htmlFor="user-role">{t("role")}</Label><select id="user-role" className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring" disabled={self} value={profile.role} onChange={(event) => setProfile({ ...profile, role: event.target.value as "USER" | "ADMIN" })}><option value="USER">{t("roles.USER")}</option><option value="ADMIN">{t("roles.ADMIN")}</option></select></div><div><Label htmlFor="user-status">{t("status")}</Label><select id="user-status" className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring" disabled={self} value={String(profile.isActive)} onChange={(event) => setProfile({ ...profile, isActive: event.target.value === "true" })}><option value="true">{t("active")}</option><option value="false">{t("inactive")}</option></select></div></div>
              <p className="text-xs leading-relaxed text-muted-foreground">{t(profile.role === "ADMIN" ? "adminHint" : "userHint")}{self && ` ${t("selfHint")}`}</p>
            </>}
            {isPassword && <>
              <div><Label htmlFor="user-password">{t("password")}</Label><div className="relative mt-1.5"><Input id="user-password" className="pe-11" dir="ltr" type={visible ? "text" : "password"} value={password} minLength={8} maxLength={72} autoComplete="new-password" required aria-invalid={!!fields.password} aria-describedby="password-help" onChange={(event) => setPassword(event.target.value)} /><Button type="button" size="icon" variant="ghost" className="absolute end-0 top-0 size-9" aria-label={t(visible ? "hidePassword" : "showPassword")} onClick={() => setVisible((v) => !v)}>{visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}</Button></div><p id="password-help" className={`mt-1 text-xs ${fields.password ? "text-destructive" : "text-muted-foreground"}`}>{fields.password || t("validation.password")}</p></div>
              <div><Label htmlFor="user-confirm-password">{t("confirmPassword")}</Label><div className="relative mt-1.5"><Input id="user-confirm-password" className="pe-11" dir="ltr" type={confirmVisible ? "text" : "password"} value={confirmPassword} autoComplete="new-password" required aria-invalid={!!fields.confirmPassword} aria-describedby={fields.confirmPassword ? "error-confirm" : undefined} onChange={(event) => setConfirmPassword(event.target.value)} /><Button type="button" size="icon" variant="ghost" className="absolute end-0 top-0 size-9" aria-label={t(confirmVisible ? "hidePassword" : "showPassword")} onClick={() => setConfirmVisible((v) => !v)}>{confirmVisible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}</Button></div>{fields.confirmPassword && <p id="error-confirm" className="mt-1 text-xs text-destructive">{fields.confirmPassword}</p>}</div>
            </>}
            {action.kind === "delete" && <div><Label htmlFor="delete-confirmation">{t("deleteConfirmation", { email: user?.email || "" })}</Label><Input id="delete-confirmation" className={inputClass} dir="ltr" value={confirmation} autoComplete="off" required onChange={(event) => setConfirmation(event.target.value)} /></div>}
          </fieldset>
          {error && <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
          <DialogFooter><Button type="button" variant="outline" disabled={busy} onClick={onClose}>{t("cancel")}</Button><Button type="submit" variant={action.kind === "delete" || (action.kind === "status" && user?.isActive) ? "destructive" : "default"} disabled={busy || (action.kind === "delete" && confirmation !== user?.email)}>{busy && <Loader2 className="animate-spin" aria-hidden="true" />}{t(busy ? "saving" : action.kind === "edit" ? "save" : title)}</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
