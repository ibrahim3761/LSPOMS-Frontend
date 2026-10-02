"use client";

import { useGetAllAreas, useCreateArea, useUpdateArea, useDeleteArea } from "@/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TablePagination from "@/components/ui/table-pagination";
import AreasTable from "@/components/modules/admin/areas-table";
import AreaForm from "@/components/form/area-form";
import { IArea } from "@/types";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";


export default function AreasPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editArea, setEditArea] = useState<IArea | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useGetAllAreas({
    page,
    limit: 10,
    search: search || undefined,
  });

  const { mutate: createArea, isPending: createPending } = useCreateArea();
  const { mutate: updateArea, isPending: updatePending } = useUpdateArea();
  const { mutate: deleteArea } = useDeleteArea();

  const areas = (data?.data ?? []) as IArea[];
  const meta = data?.meta;

  const handleCreate = (value: { name: string; district: string; city: string }) => {
    createArea(value, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-areas"] });
        queryClient.invalidateQueries({ queryKey: ["areas"] });
        toast.add({ title: "Area Created", description: "Area has been created successfully", type: "success" });
        setIsCreateOpen(false);
      },
      onError: (err) => {
        toast.add({ title: "Failed", description: getErrorMessage(err), type: "error" });
      },
    });
  };

  const handleUpdate = (value: { name: string; district: string; city: string }) => {
    if (!editArea) return;
    updateArea(
      { id: editArea.id, payload: value },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["admin-areas"] });
          queryClient.invalidateQueries({ queryKey: ["areas"] });
          toast.add({ title: "Area Updated", description: "Area has been updated successfully", type: "success" });
          setEditArea(null);
        },
        onError: (err) => {
          toast.add({ title: "Failed", description: getErrorMessage(err), type: "error" });
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteArea(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-areas"] });
        queryClient.invalidateQueries({ queryKey: ["areas"] });
        toast.add({ title: "Area Deleted", description: "Area has been deleted successfully", type: "success" });
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
          <h1 className="text-2xl font-bold tracking-tight">Areas</h1>
          <p className="text-muted-foreground text-sm">Manage service areas</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="size-4 mr-2" /> Add Area
        </Button>
      </div>

      <Input
        placeholder="Search areas..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        className="max-w-xs"
      />

      <AreasTable
        areas={areas}
        isLoading={isLoading}
        onEdit={(area) => setEditArea(area)}
        onDelete={handleDelete}
      />

      {meta && (
        <TablePagination
          totalPages={meta.totalPages}
          page={page}
          handlePageChange={setPage}
        />
      )}

      {/* Create dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Area</DialogTitle>
          </DialogHeader>
          <AreaForm onSubmit={handleCreate} isPending={createPending} />
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={!!editArea} onOpenChange={(open) => !open && setEditArea(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Area</DialogTitle>
          </DialogHeader>
          {editArea && (
            <AreaForm
              area={editArea}
              onSubmit={handleUpdate}
              isPending={updatePending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}