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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TableSkeleton from "@/components/shared/table-skeleton";
import { IAdminUser } from "@/types";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

interface Props {
    users: IAdminUser[];
    isLoading: boolean;
    onChangeStatus: (id: string, status: "ACTIVE" | "BLOCKED") => void;
    onDelete: (id: string) => void;
}

const roleColor: Record<string, string> = {
    SUPER_ADMIN: "bg-purple-500 hover:bg-purple-600",
    ADMIN: "bg-blue-500 hover:bg-blue-600",
    TECHNICIAN: "bg-green-500 hover:bg-green-600",
    CUSTOMER: "",
};

export default function UsersTable({
    users,
    isLoading,
    onChangeStatus,
    onDelete,
}: Props) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Auth</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                {isLoading ? (
                    <TableSkeleton rows={5} cols={6} />
                ) : users.length === 0 ? (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                No users found
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="size-8">
                                            <AvatarImage src={user.imageUrl} alt={user.name} />
                                            <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-sm">{user.name}</p>
                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge className={roleColor[user.role]}>{user.role}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={user.status === "ACTIVE" ? "default" : "destructive"}
                                        className={user.status === "ACTIVE" ? "bg-green-500 hover:bg-green-600" : ""}
                                    >
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                    {user.authProvider}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {format(new Date(user.createdAt), "dd MMM yyyy")}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            render={
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="size-4" />
                                                </Button>
                                            }
                                        />
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    onChangeStatus(
                                                        user.id,
                                                        user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE"
                                                    )
                                                }
                                            >
                                                {user.status === "ACTIVE" ? "Block User" : "Unblock User"}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-destructive"
                                                onClick={() => onDelete(user.id)}
                                            >
                                                Delete User
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                )}
            </Table>
        </div>
    );
}