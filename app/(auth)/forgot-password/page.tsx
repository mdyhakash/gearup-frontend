import { ForgotPasswordForm } from "../_components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Reset your password
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Enter your email and we'll send you a link to reset it.
        </p>
      </div>
      <ForgotPasswordForm />
    </>
  );
}
