/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: <explanation> */
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex items-center justify-center size-16 rounded-full bg-red-100 dark:bg-red-950/30">
        <AlertTriangle className="size-8 text-red-600" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Something Went Wrong</h1>
        <p className="text-muted-foreground max-w-md">
          An unexpected error occurred. Please try again or go back to the homepage.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
      </div>
      <div className="flex gap-3">
        <Button onClick={reset}>Try Again</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Go Home
        </Button>
      </div>
    </div>
  );
}