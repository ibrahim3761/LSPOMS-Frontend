"use client";

import { useGetAllPackages, useCreatePackage, useUpdatePackage, useDeletePackage } from "@/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TablePagination from "@/components/ui/table-pagination";
import PackagesTable from "@/components/modules/admin/packages-table";
import PackageForm from "@/components/form/package-form";
import { IPackage } from "@/types";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";


export default function PackagesPage() {
  const [page, setPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editPkg, setEditPkg] = useState<IPackage | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useGetAllPackages({ page, limit: 10 });
  const { mutate: createPackage, isPending: createPending } = useCreatePackage();
  const { mutate: updatePackage, isPending: updatePending } = useUpdatePackage();
  const { mutate: deletePackage } = useDeletePackage();

  const packages = (data?.data ?? []) as IPackage[];
  const meta = data?.meta;

  const handleCreate = (value: {
    name: string;
    description: string;
    price: number;
    durationDays: number;
  }) => {
    createPackage(value, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["packages"] });
        toast.add({ title: "Package Created", description: "Package has been created successfully", type: "success" });
        setIsCreateOpen(false);
      },
      onError: (err) => {
        toast.add({ title: "Failed", description: getErrorMessage(err), type: "error" });
      },
    });
  };

  const handleUpdate = (value: {
    name: string;
    description: string;
    price: number;
    durationDays: number;
  }) => {
    if (!editPkg) return;
    updatePackage(
      { id: editPkg.id, payload: value },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["packages"] });
          toast.add({ title: "Package Updated", description: "Package has been updated successfully", type: "success" });
          setEditPkg(null);
        },
        onError: (err) => {
          toast.add({ title: "Failed", description: getErrorMessage(err), type: "error" });
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deletePackage(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["packages"] });
        toast.add({ title: "Package Deleted", description: "Package has been deleted successfully", type: "success" });
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
          <h1 className="text-2xl font-bold tracking-tight">Packages</h1>
          <p className="text-muted-foreground text-sm">Manage premium packages</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="size-4 mr-2" /> Add Package
        </Button>
      </div>

      <PackagesTable
        packages={packages}
        isLoading={isLoading}
        onEdit={(pkg) => setEditPkg(pkg)}
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
            <DialogTitle>Create Package</DialogTitle>
          </DialogHeader>
          <PackageForm onSubmit={handleCreate} isPending={createPending} />
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={!!editPkg} onOpenChange={(open) => !open && setEditPkg(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Package</DialogTitle>
          </DialogHeader>
          {editPkg && (
            <PackageForm
              pkg={editPkg}
              onSubmit={handleUpdate}
              isPending={updatePending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}