import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-16 px-4 bg-indigo-600 dark:bg-indigo-800">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center">
        <div className="flex items-center justify-center size-14 rounded-full bg-white/10">
          <Zap className="size-7 text-white" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Ready to Stay Informed?
        </h2>
        <p className="text-indigo-100 text-lg">
          Join thousands of users who never miss a power outage update.
          Register today and take control of your power situation.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-indigo-600 hover:bg-indigo-50"
            render={<Link href="/register" />}
            nativeButton={false}
          >
            Create Free Account
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-indigo-600 hover:bg-white/10"
            render={<Link href="/apply" />}
            nativeButton={false}
          >
            Apply as Technician
          </Button>
        </div>
      </div>
    </section>
  );
}