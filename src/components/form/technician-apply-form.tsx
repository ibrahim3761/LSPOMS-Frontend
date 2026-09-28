/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
"use client";

import { useForm } from "@tanstack/react-form";
import {
    BriefcaseMedical,
    FileText,
    FileUp,
    Mail,
    MapPin,
    Phone,
    User,
    X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    technicianApplicationSchema,
    MAX_FILE_SIZE,
} from "@/validation";

import { formatFileSize } from "@/utils";

import {
    type TechnicianApplicationData,
} from "@/types";

import { useApplyAsTechnician } from "@/hooks";

import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { getErrorMessage } from "@/lib/getErrorMessage";

export default function TechnicianApplyForm() {
    const router = useRouter();

    const {
        mutate: apply,
        isPending: applyPending,
    } = useApplyAsTechnician();

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            experienceYears: "",
            bio: "",
            resume: null as File | null,
        },

        validators: {
            onSubmit: technicianApplicationSchema,
        },

        onSubmit: async ({ value }) => {
            const technicianData: TechnicianApplicationData = {
                user: {
                    name: value.name.trim(),
                    email: value.email.trim(),
                },

                technician: {
                    experienceYears: Number(value.experienceYears),
                    contactNumber: value.phone.trim() || undefined,
                    address: value.address.trim() || undefined,
                    bio: value.bio.trim() || undefined,
                },
            };

            apply(
                {
                    data: technicianData,
                    resume: value.resume as File,
                },
                {
                    onSuccess: (res) => {
                        if (!res.success) {
                            toast.add({
                                title: "Server Failure",
                                description:
                                    "Something went wrong. Please try again",
                                type: "error",
                            });

                            return;
                        }

                        toast.add({
                            title: "Application Submitted",
                            description: "Please verify your account",
                            type: "success",
                        });

                        const params = new URLSearchParams({
                            email: technicianData.user.email,
                        });

                        router.push(
                            `/apply/verify-account?${params.toString()}`,
                        );
                    },

                    onError: (err) => {
                        toast.add({
                            title: "Application failure",
                            description: getErrorMessage(err),
                            type: "error",
                        });
                    },
                },
            );
        },
    });

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">
                    Apply to join LSPOMS as a technician
                </h1>

                <p className="text-sm text-muted-foreground">
                    Submit your information to apply as a technician.
                </p>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                noValidate
            >
                <FieldGroup>
                    {/* Personal Information */}
                    <div className="grid gap-5 sm:grid-cols-2">
                        {/* Name */}
                        <form.Field name="name">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Full name
                                        </FieldLabel>

                                        <div className="relative">
                                            <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                placeholder="John Doe"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                aria-invalid={isInvalid}
                                                className="pl-9"
                                                autoComplete="name"
                                            />
                                        </div>

                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Email */}
                        <form.Field name="email">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Email address
                                        </FieldLabel>

                                        <div className="relative">
                                            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="email"
                                                placeholder="technician@example.com"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                aria-invalid={isInvalid}
                                                className="pl-9"
                                                autoComplete="email"
                                            />
                                        </div>

                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Phone */}
                        <form.Field name="phone">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Contact number
                                        </FieldLabel>

                                        <div className="relative">
                                            <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="tel"
                                                placeholder="+880 1712 345678"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                aria-invalid={isInvalid}
                                                className="pl-9"
                                                autoComplete="tel"
                                            />
                                        </div>

                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Address */}
                        <form.Field name="address">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Address{" "}
                                            <span className="font-normal text-muted-foreground">
                                                (optional)
                                            </span>
                                        </FieldLabel>

                                        <div className="relative">
                                            <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                placeholder="Your current address"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                aria-invalid={isInvalid}
                                                className="pl-9"
                                                autoComplete="street-address"
                                            />
                                        </div>

                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>
                    </div>

                    {/* Professional Information */}
                    <div className="grid gap-5 sm:grid-cols-2">
                        {/* Experience */}
                        <form.Field name="experienceYears">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Years of experience
                                        </FieldLabel>

                                        <div className="relative">
                                            <BriefcaseMedical className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="number"
                                                min={0}
                                                inputMode="numeric"
                                                placeholder="5"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                aria-invalid={isInvalid}
                                                className="pl-9"
                                            />
                                        </div>

                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>
                    </div>

                    {/* Bio */}
                    <form.Field name="bio">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Professional bio{" "}
                                        <span className="font-normal text-muted-foreground">
                                            (optional)
                                        </span>
                                    </FieldLabel>

                                    <Textarea
                                        id={field.name}
                                        name={field.name}
                                        rows={4}
                                        placeholder="Share your professional background, skills and experience..."
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        aria-invalid={isInvalid}
                                    />

                                    <div className="flex items-center justify-between gap-2">
                                        <FieldDescription>
                                            This information may be shown on your
                                            public profile after approval.
                                        </FieldDescription>

                                        <span className="text-xs text-muted-foreground">
                                            {field.state.value.length}/1000
                                        </span>
                                    </div>

                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>

                    {/* Resume */}
                    <form.Field name="resume">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            const file = field.state.value;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor="resume-field">
                                        Resume / CV
                                    </FieldLabel>

                                    <div className="flex flex-wrap items-center gap-3">
                                        <Button
                                            render={
                                                <label htmlFor="resume-field" />
                                            }
                                            nativeButton={false}
                                            variant="outline"
                                        >
                                            <FileUp size="4" />
                                            Upload resume
                                        </Button>

                                        <input
                                            id="resume-field"
                                            type="file"
                                            className="sr-only"
                                            name={field.name}
                                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                            onChange={(e) => {
                                                const selected =
                                                    e.target.files?.[0] ?? null;

                                                field.handleChange(selected);

                                                e.target.value = "";
                                            }}
                                        />

                                        {file ? (
                                            <span className="inline-flex max-w-full items-center gap-2 rounded-lg bg-muted px-2.5 py-1 text-sm">
                                                <FileText className="size-4 shrink-0 text-primary" />

                                                <span className="truncate">
                                                    {file.name}
                                                </span>

                                                <span className="text-xs text-muted-foreground">
                                                    {formatFileSize(file.size)}
                                                </span>

                                                <button
                                                    type="button"
                                                    aria-label="Remove resume"
                                                    onClick={() => {
                                                        field.handleChange(null);
                                                        field.handleBlur();
                                                    }}
                                                    className="text-muted-foreground transition-colors hover:text-destructive focus:outline-none"
                                                >
                                                    <X className="size-4" />
                                                </button>
                                            </span>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">
                                                PDF, DOC, DOCX or image up to{" "}
                                                {MAX_FILE_SIZE} MB
                                            </span>
                                        )}
                                    </div>

                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>
                </FieldGroup>

                <div className="mt-5 flex w-full justify-end">
                    <Button disabled={applyPending} type="submit">
                        {applyPending ? (
                            <>
                                <Spinner />
                                submitting
                            </>
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </div>
            </form>

            <p className="text-xs leading-relaxed text-muted-foreground">
                Already an approved technician?{" "}
                <Link
                    href="/login"
                    className="font-medium underline underline-offset-4 hover:text-primary"
                >
                    Sign in to the Technician Portal
                </Link>
                . Patient applications should use the{" "}
                <Link
                    href="/register"
                    className="font-medium underline underline-offset-4 hover:text-primary"
                >
                    patient registration
                </Link>{" "}
                form instead.
            </p>
        </div>
    );
}