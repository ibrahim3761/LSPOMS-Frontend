"use client";

import { useGetMe } from "@/hooks";
import { UserRole } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import UpdateProfileForm from "@/components/form/update-profile-form";
import UpdateTechnicianProfileForm from "@/components/form/update-technician-profile-form";
import ChangePasswordForm from "@/components/form/change-password-form";
import ProfileImageUpload from "@/components/modules/profile/profile-image-upload";
export default function ProfilePage() {
  const { data, isLoading } = useGetMe();
  const user = data?.data;
  const role = user?.role as UserRole;

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!user) return null;

  const isTechnician = role === "TECHNICIAN";

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-8">
      {/* Profile header */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your personal information</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Avatar + image upload */}
          <div className="flex items-center gap-4">
            <Avatar className="size-20">
              <AvatarImage src={user.imageUrl} alt={user.name} />
              <AvatarFallback className="text-lg">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <ProfileImageUpload />
          </div>

          <Separator />

          {/* Profile form — role based */}
          {isTechnician ? (
            <UpdateTechnicianProfileForm user={user} />
          ) : (
            <UpdateProfileForm user={user} />
          )}
        </CardContent>
      </Card>

      {/* Change password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}