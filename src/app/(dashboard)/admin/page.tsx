/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import { useGetAdminAnalytics } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  Zap,
  CalendarClock,
  DollarSign,
  CreditCard,
  Crown,
  MapPin,
  Package,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { data, isLoading } = useGetAdminAnalytics();
  const analytics = data?.data;

  if (isLoading) return <DashboardSkeleton />;
  if (!analytics) return null;

  const { users, unexpectedOutages, scheduledOutages, premium, revenue, mostPopularPackage, mostAffectedArea } = analytics;

  const unexpectedChartData = [
    { name: "Reported", value: unexpectedOutages.reported },
    { name: "Assigned", value: unexpectedOutages.assigned },
    { name: "In Progress", value: unexpectedOutages.inProgress },
    { name: "Resolved", value: unexpectedOutages.resolved },
  ];

  const scheduledChartData = [
    { name: "Upcoming", value: scheduledOutages.upcoming },
    { name: "Ongoing", value: scheduledOutages.ongoing },
    { name: "Completed", value: scheduledOutages.completed },
    { name: "Cancelled", value: scheduledOutages.cancelled },
  ];

  return (
    <div className="p-6 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          System overview and analytics
        </p>
      </div>

      {/* Users */}
      <section className="flex flex-col gap-4">
        <h2 className="text-base font-semibold">Users</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <StatCard title="Total Users" value={users.totalUsers} icon={<Users className="size-4 text-muted-foreground" />} />
          <StatCard title="Customers" value={users.totalCustomers} icon={<Users className="size-4 text-blue-500" />} />
          <StatCard title="Technicians" value={users.totalTechnicians} icon={<Users className="size-4 text-green-500" />} />
          <StatCard title="Pending" value={users.totalPendingTechnicians} icon={<Users className="size-4 text-yellow-500" />} />
          <StatCard title="Blocked" value={users.totalBlockedUsers} icon={<Users className="size-4 text-red-500" />} />
        </div>
      </section>

      {/* Revenue */}
      <section className="flex flex-col gap-4">
        <h2 className="text-base font-semibold">Revenue</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard title="Total Revenue" value={`৳${revenue.totalRevenue}`} icon={<DollarSign className="size-4 text-green-500" />} />
          <StatCard title="Total Payments" value={revenue.totalPaidPayments} icon={<CreditCard className="size-4 text-muted-foreground" />} />
          <StatCard title="Active Premium" value={premium.totalActivePremiumUsers} icon={<Crown className="size-4 text-yellow-500" />} />
          <StatCard title="Expired Premium" value={premium.totalExpiredPremiumUsers} icon={<Crown className="size-4 text-muted-foreground" />} />
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="size-4" /> Unexpected Outages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={unexpectedChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarClock className="size-4" /> Scheduled Outages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={scheduledChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* Most popular package + most affected area */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="size-4" /> Most Popular Package
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <p className="font-semibold text-lg">{mostPopularPackage.name}</p>
            <p className="text-muted-foreground">{mostPopularPackage.description}</p>
            <p>💰 ৳{mostPopularPackage.price} / {mostPopularPackage.durationDays} days</p>
            <p>👥 {mostPopularPackage._count.premiumUsers} subscribers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="size-4" /> Most Affected Area
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <p className="font-semibold text-lg">{mostAffectedArea.name}</p>
            <p className="text-muted-foreground">{mostAffectedArea.district}, {mostAffectedArea.city}</p>
            <p>⚡ {mostAffectedArea._count.unexpectedOutages} unexpected outages</p>
          </CardContent>
        </Card>
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
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
    </div>
  );
}