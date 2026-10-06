/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import { useGetPublicPackages } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import BuyPremiumModal from "@/components/modules/payments/buy-premium-modal";
import { IPackage } from "@/types";
import { useState } from "react";
import { Check } from "lucide-react";

export default function PackagesSection() {
  const [selectedPkg, setSelectedPkg] = useState<IPackage | null>(null);
  const { data, isLoading } = useGetPublicPackages();
  const packages = (data?.data ?? []) as IPackage[];

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          <div className="text-center flex flex-col gap-2">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-4 w-72 mx-auto" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight">Premium Plans</h2>
          <p className="text-muted-foreground">
            Stay informed about power outages in your area with our premium packages
          </p>
        </div>

        {/* pt-3 on the grid gives the badge room to sit above the card without being clipped */}
        <div className="grid grid-cols-1 gap-6 pt-3 sm:grid-cols-3">
          {packages.map((pkg, index) => {
            const isPopular = index === 1;
            return (
              <div key={pkg.id} className="relative">
                {isPopular && (
                  <Badge className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <Card
                  className={`flex h-full flex-col ${
                    isPopular ? "border-primary shadow-lg" : ""
                  }`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{pkg.name}</CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">
                        ৳{pkg.price}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        / {pkg.durationDays} days
                      </span>
                    </div>
                    <CardDescription className="text-sm">
                      {pkg.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-4">
                    <ul className="flex flex-col gap-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="size-4 shrink-0 text-green-500" />
                        Real-time outage notifications
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-4 shrink-0 text-green-500" />
                        Scheduled outage alerts
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-4 shrink-0 text-green-500" />
                        {pkg.durationDays} days coverage
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-4 shrink-0 text-green-500" />
                        Email invoice on payment
                      </li>
                    </ul>
                    <Button
                      className="mt-auto w-full"
                      variant={isPopular ? "default" : "outline"}
                      onClick={() => setSelectedPkg(pkg)}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      <BuyPremiumModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />
    </section>
  );
}