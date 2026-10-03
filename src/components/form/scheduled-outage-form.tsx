"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useGetPublicAreas, useGetAllTechnicians } from "@/hooks";
import {
    createScheduledOutageSchema,
    updateScheduledOutageSchema,
} from "@/validation";
import { IScheduledOutage, IAdminTechnician } from "@/types";

interface Props {
    outage?: IScheduledOutage;
    onSubmit: (value: {
        reason: string;
        startTime: string;
        endTime: string;
        areaId: string;
        technicianId: string;
    }) => void;
    isPending: boolean;
}

export default function ScheduledOutageForm({ outage, onSubmit, isPending }: Props) {
    const { data: areasData } = useGetPublicAreas();
    const { data: techniciansData } = useGetAllTechnicians({
        limit: 100,
        verificationStatus: "APPROVED",
    });

    const areas = areasData?.data ?? [];
    const technicians = (techniciansData?.data ?? []) as IAdminTechnician[];

    const form = useForm({
        defaultValues: {
            reason: outage?.reason ?? "",
            startTime: outage?.startTime
                ? new Date(outage.startTime).toISOString().slice(0, 16)
                : "",
            endTime: outage?.endTime
                ? new Date(outage.endTime).toISOString().slice(0, 16)
                : "",
            areaId: outage?.areaId ?? "",
            technicianId: outage?.technicianId ?? "",
        },
        validators: {
            onSubmit: outage ? updateScheduledOutageSchema : createScheduledOutageSchema,
        },
        onSubmit: ({ value }) => {
            onSubmit({
                ...value,
                startTime: new Date(value.startTime).toISOString(),
                endTime: new Date(value.endTime).toISOString(),
            });
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
        >
            <FieldGroup>
                <form.Field name="reason">
                    {(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Reason</FieldLabel>
                                <Textarea
                                    id={field.name}
                                    name={field.name}
                                    rows={3}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Transformer maintenance work..."
                                    aria-invalid={isInvalid}
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        );
                    }}
                </form.Field>

                <div className="grid grid-cols-2 gap-4">
                    <form.Field name="startTime">
                        {(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Start Time</FieldLabel>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="datetime-local"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        aria-invalid={isInvalid}
                                    />
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            );
                        }}
                    </form.Field>

                    <form.Field name="endTime">
                        {(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>End Time</FieldLabel>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="datetime-local"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        aria-invalid={isInvalid}
                                    />
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            );
                        }}
                    </form.Field>
                </div>

                <form.Field name="areaId">
                    {(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Area</FieldLabel>
                                <Select
                                    value={field.state.value}
                                    onValueChange={(val) => val && field.handleChange(val)}
                                >
                                    <SelectTrigger id={field.name}>
                                        <SelectValue placeholder="Select area" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {areas.map((area) => (
                                            <SelectItem key={area.id} value={area.id}>
                                                {area.name}, {area.district}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        );
                    }}
                </form.Field>

                <form.Field name="technicianId">
                    {(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Technician</FieldLabel>
                                <Select
                                    value={field.state.value}
                                    onValueChange={(val) => val && field.handleChange(val)}
                                >
                                    <SelectTrigger id={field.name}>
                                        <SelectValue placeholder="Select technician" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {technicians.map((tech) => (
                                            <SelectItem key={tech.id} value={tech.id}>
                                                {tech.name} — {tech.experienceYears} yrs
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        );
                    }}
                </form.Field>

                <Button type="submit" disabled={isPending}>
                    {isPending ? (
                        <><Spinner /> Saving...</>
                    ) : outage ? (
                        "Update Outage"
                    ) : (
                        "Create Outage"
                    )}
                </Button>
            </FieldGroup>
        </form>
    );
}