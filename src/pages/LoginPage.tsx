import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { useAuth } from "../hooks/useAuth";

type LocationState = {
  from?: {
    pathname?: string;
  };
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isConfigured, login } = useAuth();
  const [email, setEmail] = useState("admin@studio.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectPath = (location.state as LocationState | null)?.from?.pathname ?? "/admin";

  if (currentUser) {
    return <Navigate to={redirectPath} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(redirectPath, { replace: true });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#fbf7fa] px-5 py-10 sm:px-6 sm:py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[480px] bg-[#131c2e] px-6 py-12 text-white shadow-2xl sm:px-16 sm:py-16"
      >
        <h1 className="brand-serif text-center text-3xl font-bold sm:text-4xl">
          STUDIO_GALLERY
        </h1>
        <div className="mx-auto mt-4 h-px w-14 bg-[#677086]" />

        <div className="mt-10 space-y-8 sm:mt-14 sm:space-y-10">
          <TextField
            label="Email Address"
            value={email}
            type="email"
            placeholder="admin@studio.com"
            onChange={(event) => setEmail(event.target.value)}
            className="[&_input]:border-[#64718b] [&_input]:text-white [&_input]:placeholder:text-[#3c475d]"
            required
          />
          <TextField
            label="Password"
            value={password}
            type="password"
            placeholder="••••••••"
            onChange={(event) => setPassword(event.target.value)}
            className="[&_input]:border-[#64718b] [&_input]:text-white [&_input]:placeholder:text-[#3c475d]"
            required
          />
        </div>

        {!isConfigured && (
          <p className="mt-8 text-sm leading-6 text-[#ffb4b8]">
            Authentication service is not configured yet.
          </p>
        )}

        {error && <p className="mt-8 text-sm leading-6 text-[#ffb4b8]">{error}</p>}

        <Button
          className="mt-12 w-full rounded-none"
          type="submit"
          variant="primary"
          disabled={isSubmitting || !isConfigured}
        >
          Authenticate →
        </Button>
        <button
          type="button"
          className="mt-7 w-full text-center text-[10px] font-bold uppercase tracking-[0.28em] text-[#566174] transition hover:text-white sm:text-[11px] sm:tracking-[0.42em]"
        >
          Reset Access
        </button>
      </form>
    </main>
  );
}
