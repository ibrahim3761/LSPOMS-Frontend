"use client";

import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "@/components/ui/toast";
import { useGetMe } from "@/hooks";
import { UserRole } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const routes = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about-us" },
    { name: "Services", url: "/services" },
    { name: "Outages", url: "/outages" },
    { name: "Contact", url: "/contact" },
];

const dashboardRoutes: Record<UserRole, string> = {
    SUPER_ADMIN: "/admin",
    ADMIN: "/admin",
    CUSTOMER: "/dashboard",
    TECHNICIAN: "/technician",
};

export default function Header() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const queryClient = useQueryClient();

    const { data, isLoading } = useGetMe();

    const user = data?.data;
    const role = user?.role as UserRole | undefined;

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        queryClient.setQueryData(["user"], null);
        toast.add({
            title: "Logged out",
            description: "You have been logged out successfully",
            type: "success",
        });
    };

    const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
        <>
            {routes.map((route) => (
                <Link
                    key={route.url}
                    href={route.url}
                    onClick={onNavigate}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === route.url ? "text-primary" : "text-muted-foreground"
                    )}
                >
                    {route.name}
                </Link>
            ))}
            {role && (
                <Link
                    href={dashboardRoutes[role]}
                    onClick={onNavigate}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname.startsWith("/admin") ||
                            pathname.startsWith("/dashboard") ||
                            pathname.startsWith("/technician")
                            ? "text-primary"
                            : "text-muted-foreground"
                    )}
                >
                    Dashboard
                </Link>
            )}
            {role && (
                <Link
                    href="/profile"
                    onClick={onNavigate}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === "/profile" ? "text-primary" : "text-muted-foreground"
                    )}
                >
                    Profile
                </Link>
            )}
        </>
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Logo />
                    <span className="font-bold text-base tracking-tight">LSPOMS</span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-6">
                    <NavLinks />
                </nav>

                {/* Desktop auth */}
                <div className="hidden md:flex items-center gap-3">
                    {!isLoading && !user && (
                        <Button
                            variant="outline"
                            size="sm"
                            render={<Link href="/login" />}
                            nativeButton={false}
                        >
                            Login
                        </Button>
                    )}
                    {!isLoading && user && (
                        <Button variant="destructive" size="sm" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                </div>

                {/* Mobile hamburger */}
                <div className="md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger>
                            <Button variant="ghost" size="icon">
                                <Menu className="size-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-72">
                            <div className="flex flex-col h-full ">
                                {/* Mobile logo */}
                                <div className="pl-6 pt-2">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-2 mb-8"
                                        onClick={() => setOpen(false)}
                                    >
                                        <Logo />
                                        <span className="font-bold text-base tracking-tight">LSPOMS</span>
                                    </Link>
                                </div>

                                {/* Mobile links */}
                                <nav className="flex flex-col gap-5 p-6">
                                    <NavLinks onNavigate={() => setOpen(false)} />
                                </nav>

                                {/* Mobile auth */}
                                <div className="mt-auto p-6 border-t">
                                    {!isLoading && !user && (
                                        <Button
                                            variant="outline"
                                            className="w-full "
                                            render={<Link href="/login" onClick={() => setOpen(false)} />}
                                            nativeButton={false}
                                        >
                                            Login
                                        </Button>
                                    )}
                                    {!isLoading && user && (
                                        <Button
                                            variant="destructive"
                                            className="w-full"
                                            onClick={() => {
                                                handleLogout();
                                                setOpen(false);
                                            }}
                                        >
                                            Logout
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}