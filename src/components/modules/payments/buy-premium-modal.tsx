"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useGetPublicAreas, useBuyPremium } from "@/hooks";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { IPackage } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetMe } from "@/hooks";

interface Props {
  pkg: IPackage | null;
  onClose: () => void;
}

export default function BuyPremiumModal({ pkg, onClose }: Props) {
  const [areaId, setAreaId] = useState("");
  const router = useRouter();

  const { data: meData } = useGetMe();
  const { data: areasData } = useGetPublicAreas();
  const { mutate: buyPremium, isPending } = useBuyPremium();

  const areas = areasData?.data ?? [];

  const handleClose = () => {
    setAreaId("");
    onClose();
  };

  const handleBuy = () => {
    if (!meData?.data) {
      router.push("/login");
      return;
    }

    if (!pkg || !areaId) return;

    buyPremium(
      { packageId: pkg.id, areaId },
      {
        onSuccess: (res) => {
          const paymentUrl = res.data.paymentUrl;
          if (paymentUrl) {
            window.location.href = paymentUrl;
          }
        },
        onError: (err) => {
          toast.add({
            title: "Payment Failed",
            description: getErrorMessage(err),
            type: "error",
          });
        },
      }
    );
  };

  return (
    <Dialog open={!!pkg} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Buy {pkg?.name} Package</DialogTitle>
          <DialogDescription>
            ৳{pkg?.price} for {pkg?.durationDays} days — select your area to continue
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="area">Select Area</FieldLabel>
            <Select
              value={areaId}
              onValueChange={(val) => val && setAreaId(val)}
            >
              <SelectTrigger id="area">
                <SelectValue placeholder="Select your area" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area.id} value={area.id}>
                    {area.name}, {area.district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleBuy}
              disabled={!areaId || isPending}
            >
              {isPending ? <><Spinner /> Processing...</> : "Pay with bKash"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}