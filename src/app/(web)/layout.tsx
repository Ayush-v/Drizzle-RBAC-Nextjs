import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

export default function WebLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="max-w-7xl mx-auto p-4 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/">
              <span className="sr-only">Notes</span>
              <Logo />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href={"/login"}>
              <Button size={"sm"} variant={"link"}>
                Log in <span aria-hidden="true">&rarr;</span>
              </Button>
            </Link>
          </div>
        </nav>
      </header>
      <main className="max-w-6xl mx-auto p-6 lg:px-8">{children}</main>
    </>
  );
}
