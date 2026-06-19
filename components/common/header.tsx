import Link from "next/link";
import { Button } from "../ui/button";
import type { UserProfile } from "@/lib/types";

interface HeaderProps {
  profile?: UserProfile | null;
}

export default function Header({ profile }: HeaderProps) {
  const displayName = profile?.inAppName ?? profile?.username ?? null;
  const initial = displayName ? displayName.charAt(0).toUpperCase() : null;

  return (
    <header className="w-full border-b px-6 py-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="WHERE Logo" className="h-10 w-auto" />
          <div className="relative">
            <span className="text-2xl font-black text-black dark:text-white">
              WHERE
            </span>
            <span className="absolute -right-6 -top-1 rounded bg-black px-1.5 py-0.5 text-[10px] font-bold text-white dark:bg-white dark:text-black">
              AI
            </span>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          {profile ? (
            /* ── Logged-in state ── */
            <Link href="/profile">  
              <div className="flex items-center gap-3">
                {/* Avatar circle with first-letter initial */}
                <div
                  className="flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground rounded-full text-sm font-semibold select-none"
                  aria-label={`Profile of ${displayName}`}
                >
                  {initial}
                </div>
                {/* Display name */}
                <span className="text-sm text-primary font-medium sm:block">
                  {displayName}
                </span>
              </div>
            </Link>
          ) : (
            /* ── Logged-out state ── */
            <>
              <Button
                variant={"ghost"}
                size={"xl"}
                nativeButton={false}
                render={<Link href="/login" />}
              >
                Login
              </Button>
              <Button
                variant={"default"}
                size={"xl"}
                nativeButton={false}
                render={<Link href="/signup" />}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}