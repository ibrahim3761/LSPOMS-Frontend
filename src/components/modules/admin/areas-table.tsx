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
import { IArea } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface Props {
  areas: IArea[];
  isLoading: boolean;
  onEdit: (area: IArea) => void;
  onDelete: (id: string) => void;
}

export default function AreasTable({ areas, isLoading, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>District</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton rows={5} cols={5} />
        ) : areas.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No areas found
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {areas.map((area) => (
              <TableRow key={area.id}>
                <TableCell className="font-medium">{area.name}</TableCell>
                <TableCell>{area.district}</TableCell>
                <TableCell>{area.city}</TableCell>
                <TableCell className="text-sm">
                  {area.createdAt
                    ? format(new Date(area.createdAt), "dd MMM yyyy")
                    : "—"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onEdit(area)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => onDelete(area.id)}
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