"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useUploadProfileImage } from "@/hooks";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useQueryClient } from "@tanstack/react-query";
import { ImageUp } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function ProfileImageUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { mutate: uploadImage, isPending } = useUploadProfileImage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    uploadImage(formData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Upload Failed",
            description: "Something went wrong. Please try again",
            type: "error",
          });
          return;
        }
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.add({
          title: "Image Updated",
          description: "Your profile image has been updated",
          type: "success",
        });
      },
      onError: (err) => {
        toast.add({
          title: "Upload Failed",
          description: getErrorMessage(err),
          type: "error",
        });
      },
    });

    // reset input
    e.target.value = "";
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleChange}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={isPending}
        onClick={() => inputRef.current?.click()}
      >
        {isPending ? <><Spinner /> Uploading...</> : <><ImageUp className="size-4" /> Change Photo</>}
      </Button>
    </div>
  );
}