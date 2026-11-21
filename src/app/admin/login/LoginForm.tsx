"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, {});

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div>
        <label htmlFor="password" className="block text-[0.88rem] font-semibold">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          aria-invalid={Boolean(state.error)}
          aria-describedby={state.error ? "login-error" : undefined}
          className={`field mt-1.5 ${state.error ? "!border-terracotta" : ""}`}
        />
        {state.error && (
          <p id="login-error" role="alert" className="mt-1.5 text-[0.85rem] font-semibold text-terracotta">
            {state.error}
          </p>
        )}
      </div>
      <button type="submit" disabled={pending} className="btn btn-primary w-full disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
