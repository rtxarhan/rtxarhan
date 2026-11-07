import { useConvexAuth, useQuery } from "convex/react";
import { Link } from "react-router-dom";
import { LogIn, LogOut, ShieldAlert } from "lucide-react";
import { api } from "@/convex/_generated/api.js";
import { ADMIN_EMAIL } from "@/convex/shared/siteContent.ts";
import { Button } from "@/components/ui/button.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { useAuth } from "@/hooks/use-auth.ts";
import { DEFAULT_CONTENT } from "@/lib/default-content.ts";
import { IMAGES } from "@/lib/site-config.ts";
import AdminEditor from "./_components/admin-editor.tsx";

function CenteredCard({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]"
      />
      <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-border/70 bg-card/80 p-8 text-center">
        <img src={IMAGES.logo} alt="" className="size-16 rounded-2xl object-cover shadow-[0_0_28px_oklch(0.63_0.25_25/45%)]" />
        {children}
      </div>
    </main>
  );
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Spinner className="size-8 text-primary" />
    </div>
  );
}

function AdminContent({ onSignOut }: { onSignOut: () => void }) {
  const stored = useQuery(api.siteContent.get, {});
  if (stored === undefined) return <LoadingScreen />;
  return <AdminEditor initial={stored ?? DEFAULT_CONTENT} onSignOut={onSignOut} />;
}

export default function AdminPage() {
  const auth = useAuth();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const isAdmin = useQuery(api.siteContent.isAdmin, isAuthenticated ? {} : "skip");
  const signOut = () => void auth.signout();

  if (auth.isLoading || isLoading) return <LoadingScreen />;

  if (!auth.isAuthenticated) {
    return (
      <CenteredCard>
        <h1 className="pt-6 font-display text-2xl font-black uppercase tracking-wider">
          Admin <span className="text-primary">Panel</span>
        </h1>
        <p className="pt-3 text-base text-muted-foreground">Sign in to edit your website content.</p>
        <Button size="lg" className="mt-6 w-full cursor-pointer" onClick={() => void auth.signin({ returnTo: "/admin" })}>
          <LogIn />
          Sign in
        </Button>
        <Link to="/" className="cursor-pointer pt-4 text-sm text-muted-foreground transition-colors hover:text-primary">
          Back to website
        </Link>
      </CenteredCard>
    );
  }

  if (isAdmin === undefined) return <LoadingScreen />;

  if (!isAdmin) {
    return (
      <CenteredCard>
        <ShieldAlert className="mt-6 size-8 text-destructive" />
        <h1 className="pt-3 font-display text-xl font-black uppercase tracking-wider">Access denied</h1>
        <p className="pt-3 text-base text-muted-foreground">
          Only {ADMIN_EMAIL} can open the admin panel. Sign out and sign in with that account.
        </p>
        <Button size="lg" variant="secondary" className="mt-6 w-full cursor-pointer" onClick={signOut}>
          <LogOut />
          Sign out
        </Button>
      </CenteredCard>
    );
  }

  return <AdminContent onSignOut={signOut} />;
}
