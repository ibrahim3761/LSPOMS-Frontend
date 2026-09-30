/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import { useGetCustomerAnalytics } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, CheckCircle, Clock, Zap, CreditCard, DollarSign } from "lucide-react";
import { format } from "date-fns";

export default function CustomerDashboardPage() {
  const { data, isLoading } = useGetCustomerAnalytics();
  const analytics = data?.data;

  if (isLoading) return <DashboardSkeleton />;

  if (!analytics) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground">
          Failed to load dashboard data.
        </p>
      </div>
    );
  }

  const { outages, subscriptions, payments } = analytics;

  return (
    <div className="p-6 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Overview of your outage reports and subscriptions
        </p>
      </div>

      {/* Outage stats */}
      <section className="flex flex-col gap-4">
        <h2 className="text-base font-semibold">Outage Reports</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            title="Total"
            value={outages.total}
            icon={<Zap className="size-4 text-muted-foreground" />}
          />
          <StatCard
            title="Reported"
            value={outages.reported}
            icon={<AlertTriangle className="size-4 text-yellow-500" />}
          />
          <StatCard
            title="In Progress"
            value={outages.inProgress}
            icon={<Clock className="size-4 text-blue-500" />}
          />
          <StatCard
            title="Resolved"
            value={outages.resolved}
            icon={<CheckCircle className="size-4 text-green-500" />}
          />
        </div>
      </section>

      {/* Payment summary */}
      <section className="flex flex-col gap-4">
        <h2 className="text-base font-semibold">Payment Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Total Spent"
            value={`৳${payments.totalAmountSpent}`}
            icon={<DollarSign className="size-4 text-muted-foreground" />}
          />
          <StatCard
            title="Total Payments"
            value={payments.totalPaidPayments}
            icon={<CreditCard className="size-4 text-muted-foreground" />}
          />
        </div>
      </section>

      {/* Active subscriptions */}
      <section className="flex flex-col gap-4">
        <h2 className="text-base font-semibold">Active Subscriptions</h2>
        {subscriptions.active.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-sm text-muted-foreground">
              No active subscriptions. Buy a package from the homepage.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {subscriptions.active.map((sub) => (
              <Card key={sub.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{sub.package.name}</CardTitle>
                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <p>📍 {sub.area.name}, {sub.area.district}</p>
                  <p>💰 ৳{sub.package.price} / {sub.package.durationDays} days</p>
                  <p>📅 Started: {format(new Date(sub.startDate), "dd MMM yyyy")}</p>
                  <p>⏳ Expires: {format(new Date(sub.expiresAt), "dd MMM yyyy")}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
    </div>
  );
}