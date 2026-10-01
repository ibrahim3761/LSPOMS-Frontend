"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
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
import { useUpdateOutageStatus } from "@/hooks";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useQueryClient } from "@tanstack/react-query";
import { OutageStatus } from "@/types";
import { updateOutageStatusSchema } from "@/validation";


interface Props {
  outageId: string;
  currentStatus: OutageStatus;
  onSuccess: () => void;
}

export default function UpdateStatusForm({ outageId, currentStatus, onSuccess }: Props) {
  const queryClient = useQueryClient();
  const { mutate: updateStatus, isPending } = useUpdateOutageStatus();

  const form = useForm({
    defaultValues: {
      status: currentStatus === "ASSIGNED" ? "IN_PROGRESS" : "RESOLVED" as "IN_PROGRESS" | "RESOLVED",
      note: "",
    },
    validators: {
      onSubmit: updateOutageStatusSchema,
    },
    onSubmit: ({ value }) => {
      updateStatus(
        { id: outageId, payload: value },
        {
          onSuccess: (res) => {
            if (!res.success) {
              toast.add({
                title: "Server Failure",
                description: "Something went wrong. Please try again",
                type: "error",
              });
              return;
            }
            queryClient.invalidateQueries({ queryKey: ["my-assignments"] });
            queryClient.invalidateQueries({ queryKey: ["technician-analytics"] });
            toast.add({
              title: "Status Updated",
              description: "Outage status has been updated successfully",
              type: "success",
            });
            onSuccess();
          },
          onError: (err) => {
            toast.add({
              title: "Update failed",
              description: getErrorMessage(err),
              type: "error",
            });
          },
        }
      );
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
        <form.Field name="status">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>New Status</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(val) =>
                    field.handleChange(val as "IN_PROGRESS" | "RESOLVED")
                  }
                >
                  <SelectTrigger id={field.name}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="RESOLVED">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="note">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Note{" "}
                  <span className="font-normal text-muted-foreground">(optional)</span>
                </FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  rows={3}
                  placeholder="Any additional notes about the repair..."
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                <div className="flex justify-end">
                  <span className="text-xs text-muted-foreground">
                    {field.state.value?.length ?? 0}/500
                  </span>
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Button type="submit" disabled={isPending}>
          {isPending ? <><Spinner /> Updating...</> : "Update Status"}
        </Button>
      </FieldGroup>
    </form>
  );
}