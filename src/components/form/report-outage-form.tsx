"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useReportOutage, useGetPublicAreas } from "@/hooks";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useRouter } from "next/navigation";

const reportOutageSchema = z.object({
    areaId: z.string().min(1, "Please select an area"),
    description: z.string().trim().min(10, "Description must be at least 10 characters"),
});

export default function ReportOutageForm() {
    const router = useRouter();
    const { mutate: reportOutage, isPending } = useReportOutage();
    const { data: areasData, isLoading: areasLoading } = useGetPublicAreas();
    const areas = areasData?.data ?? [];

    const form = useForm({
        defaultValues: {
            areaId: "",
            description: "",
        },
        validators: {
            onSubmit: reportOutageSchema,
        },
        onSubmit: ({ value }) => {
            reportOutage(value, {
                onSuccess: (res) => {
                    if (!res.success) {
                        toast.add({
                            title: "Server Failure",
                            description: "Something went wrong. Please try again",
                            type: "error",
                        });
                        return;
                    }
                    toast.add({
                        title: "Outage Reported",
                        description: "Your report has been submitted successfully",
                        type: "success",
                    });
                    router.push("/dashboard/my-reports");
                },
                onError: (err) => {
                    toast.add({
                        title: "Failed",
                        description: getErrorMessage(err),
                        type: "error",
                    });
                },
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
                {/* Area select */}
                <form.Field name="areaId">
                    {(field) => {
                        const isInvalid =
                            field.state.meta.isTouched && !field.state.meta.isValid;

                        const selectedArea = areas.find(
                            (area) => area.id === field.state.value
                        );

                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Area</FieldLabel>

                                <Select
                                    disabled={areasLoading}
                                    value={field.state.value}
                                    onValueChange={(val) => field.handleChange(val ?? "")}
                                >
                                    <SelectTrigger id={field.name}>
                                        <SelectValue placeholder="Select your area">
                                            {selectedArea
                                                ? `${selectedArea.name}, ${selectedArea.district}`
                                                : undefined}
                                        </SelectValue>
                                    </SelectTrigger>

                                    <SelectContent>
                                        {areas.map((area) => (
                                            <SelectItem key={area.id} value={area.id}>
                                                {area.name}, {area.district}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {isInvalid && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>
                        );
                    }}
                </form.Field>

                {/* Description */}
                <form.Field name="description">
                    {(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                                <Textarea
                                    id={field.name}
                                    name={field.name}
                                    rows={5}
                                    placeholder="Describe the outage — when it started, how many households are affected..."
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    aria-invalid={isInvalid}
                                />
                                <div className="flex justify-end">
                                    <span className="text-xs text-muted-foreground">
                                        {field.state.value.length} characters
                                    </span>
                                </div>
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        );
                    }}
                </form.Field>

                <Button type="submit" disabled={isPending}>
                    {isPending ? <><Spinner /> Submitting...</> : "Submit Report"}
                </Button>
            </FieldGroup>
        </form>
    );
}