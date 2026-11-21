import { redirect } from "next/navigation";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin/stories");
  const configured = adminConfigured();

  return (
    <div className="mx-auto max-w-md pt-10">
      <div className="card p-7 sm:p-8">
        <p className="kicker kicker-accent">Editors only</p>
        <h1 className="h-card mt-2 text-[1.8rem]">Sign in to the newsroom</h1>
        <p className="mt-2 text-[0.92rem] text-ink-2">Write, edit and publish stories for the news section.</p>
        {configured ? (
          <LoginForm />
        ) : (
          <div role="alert" className="mt-6 rounded-2xl bg-terracotta-soft p-4 text-[0.9rem] text-terracotta-deep">
            The admin is switched off. Add <code className="font-mono">ADMIN_PASSWORD=…</code> to <code className="font-mono">.env.local</code>{" "}
            in the project folder, then restart the dev server.
          </div>
        )}
      </div>
    </div>
  );
}
