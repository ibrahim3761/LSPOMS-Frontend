"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/shared/table-skeleton";
import { IPackage } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface Props {
  packages: IPackage[];
  isLoading: boolean;
  onEdit: (pkg: IPackage) => void;
  onDelete: (id: string) => void;
}

export default function PackagesTable({
  packages,
  isLoading,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton rows={3} cols={6} />
        ) : packages.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No packages found
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell className="font-medium">{pkg.name}</TableCell>
                <TableCell className="max-w-xs truncate text-muted-foreground text-sm">
                  {pkg.description}
                </TableCell>
                <TableCell>৳{pkg.price}</TableCell>
                <TableCell>{pkg.durationDays} days</TableCell>
                <TableCell className="text-sm">
                  {format(new Date(pkg.createdAt), "dd MMM yyyy")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onEdit(pkg)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => onDelete(pkg.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}