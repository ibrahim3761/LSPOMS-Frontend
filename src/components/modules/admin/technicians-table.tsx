"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TableSkeleton from "@/components/shared/table-skeleton";
import { IAdminTechnician } from "@/types";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";

interface Props {
  technicians: IAdminTechnician[];
  isLoading: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const statusColor: Record<string, string> = {
  APPROVED: "bg-green-500 hover:bg-green-600",
  REJECTED: "bg-red-500 hover:bg-red-600",
  PENDING: "bg-yellow-500 hover:bg-yellow-600",
};

export default function TechniciansTable({
  technicians,
  isLoading,
  onApprove,
  onReject,
}: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Technician</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Applied</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton rows={5} cols={7} />
        ) : technicians.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No technicians found
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {technicians.map((tech) => (
              <TableRow key={tech.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarImage src={tech.user.imageUrl} alt={tech.name} />
                      <AvatarFallback>{tech.name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{tech.name}</p>
                      <p className="text-xs text-muted-foreground">{tech.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{tech.contactNumber}</TableCell>
                <TableCell className="text-sm">{tech.experienceYears} yrs</TableCell>
                <TableCell>
                  <Badge className={statusColor[tech.verificationStatus]}>
                    {tech.verificationStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  {tech.resume ? (
                    <a
                      href={tech.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      View <ExternalLink className="size-3" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground text-sm">—</span>
                  )}
                </TableCell>
                <TableCell className="text-sm">
                  {format(new Date(tech.createdAt), "dd MMM yyyy")}
                </TableCell>
                <TableCell>
                  {tech.verificationStatus === "PENDING" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => onApprove(tech.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onReject(tech.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  {tech.verificationStatus !== "PENDING" && (
                    <span className="text-xs text-muted-foreground">
                      {tech.verificationStatus === "APPROVED" ? "Approved" : "Rejected"}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}