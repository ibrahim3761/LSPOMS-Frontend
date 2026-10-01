/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import { useGetTechnicianAnalytics } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  CalendarClock,
  ListChecks,
} from "lucide-react";

export default function TechnicianDashboardPage() {
  const { data, isLoading } = useGetTechnicianAnalytics();
  const analytics = data?.data;

  if (isLoading) return <DashboardSkeleton />;
  if (!analytics) return null;

  const { unexpectedOutages, scheduledOutages, totalAssignments, pendingAssignments, resolvedAssignments } = analytics;

  return (
    <div className="p-6 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Overview of your assignments and work
        </p>
      </div>

      {/* Summary */}
      <section className="flex flex-col gap-4">
        <h2 className="text-base font-semibold">Summary</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard
            title="Total Assignments"
            value={totalAssignments}
            icon={<ListChecks className="size-4 text-muted-foreground" />}
          />
          <StatCard
            title="Pending"
            value={pendingAssignments}
            icon={<Clock className="size-4 text-yellow-500" />}
          />
          <StatCard
            title="Resolved"
            value={resolvedAssignments}
            icon={<CheckCircle className="size-4 text-green-500" />}
          />
        </div>
      </section>

      {/* Unexpected outages */}
      <section className="flex flex-col gap-4">
        <h2 className="text-base font-semibold">Unexpected Outages</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            title="Total"
            value={unexpectedOutages.total}
            icon={<Zap className="size-4 text-muted-foreground" />}
          />
          <StatCard
            title="Assigned"
            value={unexpectedOutages.assigned}
            icon={<AlertTriangle className="size-4 text-yellow-500" />}
          />
          <StatCard
            title="In Progress"
            value={unexpectedOutages.inProgress}
            icon={<Clock className="size-4 text-blue-500" />}
          />
          <StatCard
            title="Resolved"
            value={unexpectedOutages.resolved}
            icon={<CheckCircle className="size-4 text-green-500" />}
          />
        </div>
      </section>

      {/* Scheduled outages */}
      <section className="flex flex-col gap-4">
        <h2 className="text-base font-semibold">Scheduled Outages</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            title="Total"
            value={scheduledOutages.total}
            icon={<CalendarClock className="size-4 text-muted-foreground" />}
          />
          <StatCard
            title="Upcoming"
            value={scheduledOutages.upcoming}
            icon={<Clock className="size-4 text-yellow-500" />}
          />
          <StatCard
            title="Ongoing"
            value={scheduledOutages.ongoing}
            icon={<Clock className="size-4 text-blue-500" />}
          />
          <StatCard
            title="Completed"
            value={scheduledOutages.completed}
            icon={<CheckCircle className="size-4 text-green-500" />}
          />
        </div>
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
  value: number;
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
    </div>
  );
}