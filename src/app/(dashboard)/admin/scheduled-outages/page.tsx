"use client";

import {
    useGetAllScheduledOutages,
    useCreateScheduledOutage,
    useUpdateScheduledOutage,
    useDeleteScheduledOutage,
} from "@/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import TablePagination from "@/components/ui/table-pagination";
import AdminScheduledOutagesTable from "@/components/modules/admin/scheduled-outages-table";
import ScheduledOutageForm from "@/components/form/scheduled-outage-form";
import ScheduledOutageDetailModal from "@/components/modules/admin/scheduled-outage-detail-modal";
import { IScheduledOutage } from "@/types";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";


export default function ScheduledOutagesPage() {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editOutage, setEditOutage] = useState<IScheduledOutage | null>(null);
    const [viewId, setViewId] = useState<string | null>(null);

    const queryClient = useQueryClient();

    const { data, isLoading } = useGetAllScheduledOutages({
        page,
        limit: 10,
        status: status || undefined,
    });

    const { mutate: createOutage, isPending: createPending } = useCreateScheduledOutage();
    const { mutate: updateOutage, isPending: updatePending } = useUpdateScheduledOutage();
    const { mutate: deleteOutage } = useDeleteScheduledOutage();

    const outages = (data?.data ?? []) as IScheduledOutage[];
    const meta = data?.meta;

    const handleCreate = (value: {
        reason: string;
        startTime: string;
        endTime: string;
        areaId: string;
        technicianId: string;
    }) => {
        createOutage(value, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["admin-scheduled-outages"] });
                queryClient.invalidateQueries({ queryKey: ["admin-analytics"] });
                toast.add({ title: "Outage Scheduled", description: "Scheduled outage has been created", type: "success" });
                setIsCreateOpen(false);
            },
            onError: (err) => {
                toast.add({ title: "Failed", description: getErrorMessage(err), type: "error" });
            },
        });
    };

    const handleUpdate = (value: {
        reason: string;
        startTime: string;
        endTime: string;
        areaId: string;
        technicianId: string;
    }) => {
        if (!editOutage) return;
        updateOutage(
            { id: editOutage.id, payload: value },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["admin-scheduled-outages"] });
                    toast.add({ title: "Outage Updated", description: "Scheduled outage has been updated", type: "success" });
                    setEditOutage(null);
                },
                onError: (err) => {
                    toast.add({ title: "Failed", description: getErrorMessage(err), type: "error" });
                },
            }
        );
    };

    const handleCancel = (id: string) => {
        updateOutage(
            { id, payload: { status: "CANCELLED" } },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["admin-scheduled-outages"] });
                    toast.add({ title: "Outage Cancelled", description: "Scheduled outage has been cancelled", type: "success" });
                },
                onError: (err) => {
                    toast.add({ title: "Failed", description: getErrorMessage(err), type: "error" });
                },
            }
        );
    };

    const handleDelete = (id: string) => {
        deleteOutage(id, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["admin-scheduled-outages"] });
                queryClient.invalidateQueries({ queryKey: ["admin-analytics"] });
                toast.add({ title: "Outage Deleted", description: "Scheduled outage has been deleted", type: "success" });
            },
            onError: (err) => {
                toast.add({ title: "Failed", description: getErrorMessage(err), type: "error" });
            },
        });
    };

    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Scheduled Outages</h1>
                    <p className="text-muted-foreground text-sm">
                        Manage and schedule planned power outages
                    </p>
                </div>
                <Button onClick={() => setIsCreateOpen(true)}>
                    <Plus className="size-4 mr-2" /> Schedule Outage
                </Button>
            </div>

            <div className="flex">
                <Select
                    value={status}
                    onValueChange={(val) => { setStatus(val === "ALL" || !val ? "" : val); setPage(1); }}
                >
                    <SelectTrigger className="max-w-xs">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Status</SelectItem>
                        <SelectItem value="UPCOMING">Upcoming</SelectItem>
                        <SelectItem value="ONGOING">Ongoing</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <AdminScheduledOutagesTable
                outages={outages}
                isLoading={isLoading}
                onView={(id) => setViewId(id)}
                onEdit={(outage) => setEditOutage(outage)}
                onCancel={handleCancel}
                onDelete={handleDelete}
            />

            {meta && (
                <TablePagination
                    totalPages={meta.totalPages}
                    page={page}
                    handlePageChange={setPage}
                />
            )}

            {/* Detail modal */}
            <ScheduledOutageDetailModal
                selectedId={viewId}
                onClose={() => setViewId(null)}
            />

            {/* Create dialog */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Schedule Outage</DialogTitle>
                    </DialogHeader>
                    <ScheduledOutageForm onSubmit={handleCreate} isPending={createPending} />
                </DialogContent>
            </Dialog>

            {/* Edit dialog */}
            <Dialog open={!!editOutage} onOpenChange={(open) => !open && setEditOutage(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Update Scheduled Outage</DialogTitle>
                    </DialogHeader>
                    {editOutage && (
                        <ScheduledOutageForm
                            outage={editOutage}
                            onSubmit={handleUpdate}
                            isPending={updatePending}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}