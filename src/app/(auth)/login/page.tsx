"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthSignInPage() {
  const { data } = useSession();

  // console.log(data);

  async function submitEmail(e: any) {
    e.preventDefault();

    const formData = new FormData(e.target);

    await signIn("email", { email: formData.get("email") });

    console.log("submitEmail", formData.get("email"));
    return;
  }
  async function googleSignIn() {
    await signIn("google");

    return;
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
        <p className="text-sm text-muted-foreground">
          A login link will be sent to your email! to login
        </p>
        <p>{data?.user?.email}</p>
      </div>
      <form onSubmit={submitEmail}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <Button>
            {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        onClick={() => signIn()}
        // onClick={googleSignIn}
      >
        Google
      </Button>
      <Button variant="outline" type="button" onClick={() => signOut()}>
        logout
      </Button>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}

export default AuthSignInPage;
