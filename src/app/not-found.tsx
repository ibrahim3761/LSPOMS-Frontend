import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex items-center justify-center size-16 rounded-full bg-indigo-100 dark:bg-indigo-950/30">
        <Zap className="size-8 text-indigo-600" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-bold text-indigo-600">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          Looks like this page had a power outage. The page you're looking for
          doesn't exist or has been moved.
        </p>
      </div>
      <div className="flex gap-3">
        <Button render={<Link href="/" />} nativeButton={false}>
          Go Home
        </Button>
        <Button
          variant="outline"
          render={<Link href="/outages" />}
          nativeButton={false}
        >
          View Outages
        </Button>
      </div>
    </div>
  );
}