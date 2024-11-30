import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useProfileUpdateAPI, useProfileViewAPI } from "../store/hooks";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              <Skeleton className="w-32 h-6" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="w-48 h-4 mt-2" />
            </CardDescription>
          </div>
          <div className="space-x-2">
            <Skeleton className="w-24 h-8" />
            <Skeleton className="w-24 h-8" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Profile Picture Skeleton */}
        <div className="flex justify-center mb-6">
          <Skeleton className="w-32 h-32 rounded-full" />
        </div>
        {/* Form Fields Skeleton */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-full h-10" />
          </div>
          <div className="space-y-2">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-full h-10" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-full h-10" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-full h-10" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-full h-10" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-full h-10" />
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Skeleton className="w-32 h-10" />
        <Skeleton className="w-32 h-10" />
      </CardFooter>
    </Card>
  );
};

const ProfileTab = () => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: PROFILE_DATA,
    isLoading: isGETLoading,
    isSuccess: isGETSuccess,
  } = useProfileViewAPI();

  const {
    mutate: profileUpdate,
    isPending: isPUTPending,
    isSuccess: isPUTSuccess,
    isError: isPUTError,
    error: PUTError,
  } = useProfileUpdateAPI();

  console.log(PROFILE_DATA, "thousi...................................");

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters"),
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    dateOfBirth: Yup.date()
      .max(new Date(), "Date of birth cannot be in the future")
      .required("Date of birth is required"),
    bio: Yup.string().max(500, "Bio must not exceed 500 characters"),
    bloodGroup: Yup.string()
      .required("Blood group is required")
      .matches(/^(A|B|AB|O)[+-]$/, "Invalid blood group format"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      dateOfBirth: "",
      bio: "",
      bloodGroup: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Profile updated:", values);
      profileUpdate(values);
    },
  });

  useEffect(() => {
    if (isGETSuccess && PROFILE_DATA) {
      const profileData = PROFILE_DATA.data;

      const dateOfBirth = profileData.dateOfBirth
        ? new Date(profileData.dateOfBirth)
        : "";

      formik.setValues({
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        username: profileData.username || "",
        email: profileData.email || "",
        // @ts-ignore
        dateOfBirth: dateOfBirth,
        bio: profileData?.studentProfile?.bio || "",
        bloodGroup: profileData?.studentProfile?.bloodGroup || "",
      });
    }
  }, [PROFILE_DATA, isGETSuccess]);

  const handleCancel = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  //   const handleProfilePictureChange = (event) => {
  //     const file = event.target.files?.[0];
  //     if (file) {
  //       // Handle file upload logic here
  //       formik.setFieldValue("profilePicture", file);
  //     }
  //   };

  useEffect(() => {
    if (isPUTSuccess) {
      toast({
        variant: "success",
        title: "Profile updated Successfully",
      });
    }
    if (isPUTError) {
      toast({
        variant: "destructive",
        // @ts-ignore
        title: PUTError?.response?.data.message,
      });
    }
  }, [isPUTSuccess, isPUTError]);

  return (
    <TabsContent value="profile" className="space-y-6">
      {isGETLoading ? (
        <ProfileSkeleton />
      ) : (
        <Card>
          {isPUTPending && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          )}
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  {isEditing
                    ? "Update your personal information"
                    : "View your personal information"}
                </CardDescription>
              </div>
              <div className="space-x-2">
                {!isEditing && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <form onSubmit={formik.handleSubmit}>
            <CardContent className="space-y-4">
              {/* <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                    {formik.values.profilePicture ? (
                      <img
                        src={URL.createObjectURL(formik.values.profilePicture)}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Upload className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePictureChange}
                      />
                    </label>
                  )}
                </div>
              </div> */}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    disabled={!isEditing}
                    {...formik.getFieldProps("firstName")}
                    className={
                      formik.touched.firstName && formik.errors.firstName
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-sm text-red-500">
                      {formik.errors.firstName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    disabled={!isEditing}
                    {...formik.getFieldProps("lastName")}
                    className={
                      formik.touched.lastName && formik.errors.lastName
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-sm text-red-500">
                      {formik.errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  disabled={!isEditing}
                  {...formik.getFieldProps("username")}
                  className={
                    formik.touched.username && formik.errors.username
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="text-sm text-red-500">
                    {formik.errors.username}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  disabled={!isEditing}
                  {...formik.getFieldProps("email")}
                  className={
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="dateOfBirth"
                      type="button"
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !isEditing ? "opacity-50 cursor-not-allowed" : ""
                      } ${
                        formik.touched.dateOfBirth && formik.errors.dateOfBirth
                          ? "border-red-500"
                          : ""
                      }`}
                      disabled={!isEditing}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formik.values.dateOfBirth
                        ? format(formik.values.dateOfBirth, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      // @ts-ignore
                      selected={formik.values?.dateOfBirth}
                      onSelect={(date) =>
                        formik.setFieldValue("dateOfBirth", date)
                      }
                    />
                  </PopoverContent>
                </Popover>
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                  <p className="text-sm text-red-500">
                    {formik.errors.dateOfBirth}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select
                  disabled={!isEditing}
                  value={formik.values.bloodGroup}
                  onValueChange={(value) =>
                    formik.setFieldValue("bloodGroup", value)
                  }
                >
                  <SelectTrigger
                    className={
                      formik.touched.bloodGroup && formik.errors.bloodGroup
                        ? "border-red-500"
                        : ""
                    }
                  >
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                {formik.touched.bloodGroup && formik.errors.bloodGroup && (
                  <p className="text-sm text-red-500">
                    {formik.errors.bloodGroup}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  disabled={!isEditing}
                  {...formik.getFieldProps("bio")}
                  className={
                    formik.touched.bio && formik.errors.bio
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.bio && formik.errors.bio && (
                  <p className="text-sm text-red-500">{formik.errors.bio}</p>
                )}
              </div>
            </CardContent>

            {isEditing && (
              <CardFooter className="space-x-2">
                <Button
                  type="submit"
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Save Changes
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </CardFooter>
            )}
          </form>
        </Card>
      )}

      {/* <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Profile</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your profile? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </TabsContent>
  );
};

export default ProfileTab;
