"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/pages/components/PasswordInput";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "lucide-react";

export function UserDetailsModal() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isNewPasswordValid =
    newPassword.length >= 8 || newPassword.length === 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 w-full justify-start rounded-2xl"
        >
          <User className="h-4 w-4" />
          Profile Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-semibold text-2xl">
            User Details
          </DialogTitle>
          <DialogDescription>
            View your personal information and manage your password.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 p-4 max-h-[70vh] overflow-y-auto">
          <Card className="shadow-none border-none p-3">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                View your name, email, country, and city/town.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 px-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="Theresa" readOnly />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="other-names">Other Names</Label>
                  <Input id="other-names" defaultValue="Adjaidoo" readOnly />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" defaultValue="Ghana" readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city-town">City/Town</Label>
                <Input id="city-town" defaultValue="Kumasi" readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="thess@knust-edu.gh"
                  readOnly
                />
                <p className="text-sm text-muted-foreground">
                  Email cannot be changed.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-none p-3">
            <CardHeader className="px-0">
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 px-0">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <PasswordInput
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {!isNewPasswordValid && newPassword.length > 0 && (
                  <p className="text-sm text-red-500">
                    Password must be at least 8 characters long.
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <PasswordInput
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword.length > 0 &&
                  newPassword !== confirmPassword && (
                    <p className="text-sm text-red-500">
                      Passwords do not match.
                    </p>
                  )}
              </div>
            </CardContent>
            <CardFooter className="border-t px-0 pt-4 mt-4">
              <Button
                disabled={
                  !isNewPasswordValid ||
                  newPassword !== confirmPassword ||
                  newPassword.length === 0
                }
              >
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
