/** biome-ignore-all lint/correctness/useHookAtTopLevel: <explanation> */
"use client";

import { useGetPublicAreas, useGetPublicScheduledOutages, useGetScheduledOutagesByArea, useGetUnexpectedOutagesByArea } from "@/hooks";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import TablePagination from "@/components/ui/table-pagination";
import { IScheduledOutage, IUnexpectedOutage } from "@/types";
import PublicScheduledOutagesTable from "@/components/layout/public/scheduled-outages-table";
import PublicUnexpectedOutagesTable from "@/components/layout/public/unexpected-outages-table";

export default function OutagesClient() {
    const [scheduledPage, setScheduledPage] = useState(1);
    const [unexpectedPage, setUnexpectedPage] = useState(1);
    const [scheduledStatus, setScheduledStatus] = useState("");
    const [scheduledAreaId, setScheduledAreaId] = useState("");
    const [unexpectedAreaId, setUnexpectedAreaId] = useState("");

    const { data: areasData } = useGetPublicAreas();
    const areas = areasData?.data ?? [];

    // Always call both hooks — no conditional hook calls allowed in React
    const { data: scheduledAllData, isLoading: scheduledAllLoading } =
        useGetPublicScheduledOutages({
            page: scheduledPage,
            limit: 10,
            status: scheduledStatus || undefined,
        });

    const { data: scheduledAreaData, isLoading: scheduledAreaLoading } =
        useGetScheduledOutagesByArea(scheduledAreaId, {
            page: scheduledPage,
            limit: 10,
            status: scheduledStatus || undefined,
        });

    // Pick which result to display based on area selection
    const scheduledData = scheduledAreaId ? scheduledAreaData : scheduledAllData;
    const scheduledLoading = scheduledAreaId ? scheduledAreaLoading : scheduledAllLoading;

    // unexpected — always by area, reported/active only (no status filter needed)
    const { data: unexpectedData, isLoading: unexpectedLoading } =
        useGetUnexpectedOutagesByArea(unexpectedAreaId, {
            page: unexpectedPage,
            limit: 10,
        });

    const scheduledOutages = (scheduledData?.data ?? []) as IScheduledOutage[];
    const scheduledMeta = scheduledData?.meta;

    const unexpectedOutages = (unexpectedData?.data ?? []) as IUnexpectedOutage[];
    const unexpectedMeta = unexpectedData?.meta;

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col gap-12">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Power Outages</h1>
                <p className="text-muted-foreground">
                    Stay informed about scheduled and unexpected power outages in your area
                </p>
            </div>

            {/* Scheduled outages */}
            <section className="flex flex-col gap-4">
                <div>
                    <h2 className="text-xl font-semibold">Scheduled Outages</h2>
                    <p className="text-sm text-muted-foreground">
                        Planned maintenance and scheduled power cuts
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Select
                        value={scheduledAreaId}
                        onValueChange={(val) => { setScheduledAreaId(val === "ALL" || !val ? "" : val); setScheduledPage(1); }}
                    >
                        <SelectTrigger className="sm:max-w-xs">
                            <SelectValue placeholder="All areas">
                                {() => {
                                    if (!scheduledAreaId) return "All areas";
                                    const area = areas.find((a) => a.id === scheduledAreaId);
                                    return area ? `${area.name}, ${area.district}` : "All areas";
                                }}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Areas</SelectItem>
                            {areas.map((area) => (
                                <SelectItem key={area.id} value={area.id}>
                                    {area.name}, {area.district}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={scheduledStatus}
                        onValueChange={(val) => { setScheduledStatus(val === "ALL" || !val ? "" : val); setScheduledPage(1); }}
                    >
                        <SelectTrigger className="sm:max-w-xs">
                            <SelectValue placeholder="All statuses" />
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

                <PublicScheduledOutagesTable
                    outages={scheduledOutages}
                    isLoading={scheduledLoading}
                />

                {scheduledMeta && (
                    <TablePagination
                        totalPages={scheduledMeta.totalPages}
                        page={scheduledPage}
                        handlePageChange={setScheduledPage}
                    />
                )}
            </section>

            {/* Unexpected outages */}
            <section className="flex flex-col gap-4">
                <div>
                    <h2 className="text-xl font-semibold">Unexpected Outages</h2>
                    <p className="text-sm text-muted-foreground">
                        Select an area to see reported and active outages
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Select
                        value={unexpectedAreaId}
                        onValueChange={(val) => {
                            setUnexpectedAreaId(val === "ALL" || !val ? "" : val);
                            setUnexpectedPage(1);
                        }}
                    >
                        <SelectTrigger className="sm:max-w-xs">
                            <SelectValue placeholder="All areas">
                                {() => {
                                    if (!unexpectedAreaId) return "All areas";
                                    const area = areas.find((a) => a.id === unexpectedAreaId);
                                    return area ? `${area.name}, ${area.district}` : "All areas";
                                }}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Areas</SelectItem>
                            {areas.map((area) => (
                                <SelectItem key={area.id} value={area.id}>
                                    {area.name}, {area.district}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <PublicUnexpectedOutagesTable
                    outages={unexpectedOutages}
                    isLoading={unexpectedLoading}
                    showAreaPrompt={!unexpectedAreaId}
                />

                {unexpectedMeta && unexpectedAreaId && (
                    <TablePagination
                        totalPages={unexpectedMeta.totalPages}
                        page={unexpectedPage}
                        handlePageChange={setUnexpectedPage}
                    />
                )}
            </section>
        </div>
    );
}