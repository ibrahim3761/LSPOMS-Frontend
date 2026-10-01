"use client";

import { useGetMyAssignments } from "@/hooks";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TablePagination from "@/components/ui/table-pagination";
import { IAssignments } from "@/types";
import UnexpectedOutagesTable from "@/components/modules/technician/unexpected-outages-table";
import ScheduledOutagesTable from "@/components/modules/technician/scheduled-outages-table";
import OutageDetailModal from "@/components/modules/technician/outage-detail-modal";

export default function AssignmentsPage() {
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading } = useGetMyAssignments({ page, limit: 10 });

  const assignments = data?.data?.data as IAssignments | undefined;
  const meta = data?.data?.meta;

  const unexpectedOutages = assignments?.unexpectedOutages ?? [];
  const scheduledOutages = assignments?.scheduledOutages ?? [];

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Assignments</h1>
        <p className="text-muted-foreground text-sm">
          All your assigned outages — unexpected and scheduled
        </p>
      </div>

      <Tabs defaultValue="unexpected">
        <TabsList>
          <TabsTrigger value="unexpected">
            Unexpected ({meta?.unexpectedTotal ?? 0})
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            Scheduled ({meta?.scheduledTotal ?? 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="unexpected" className="mt-4 flex flex-col gap-4">
          <UnexpectedOutagesTable
            outages={unexpectedOutages}
            isLoading={isLoading}
            onViewDetails={(id) => setSelectedId(id)}
          />
          {meta && (
            <TablePagination
              totalPages={Math.ceil(meta.unexpectedTotal / 10)}
              page={page}
              handlePageChange={setPage}
            />
          )}
        </TabsContent>

        <TabsContent value="scheduled" className="mt-4">
          <ScheduledOutagesTable
            outages={scheduledOutages}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>

      <OutageDetailModal
        selectedId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}