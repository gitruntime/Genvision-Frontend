import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { CalendarIcon, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import VolunteerTab from "../components/volunteer-tab";
import AddressTab from "../components/address-tab";
import ProfileTab from "../components/profile-tab";
import InterestsComponent from "../components/interest";
import GoalsComponent from "../components/goals";

// Types
interface Profile {
  name: string;
  email: string;
  phone: string;
  dob: Date | undefined;
  bio: string;
  profilePicture: string;
}

interface Interest {
  id: number;
  name: string;
  category: string;
}

interface Goal {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  status: "Not Started" | "In Progress" | "Completed";
}

const ProfileUpdate = () => {
  // State
  const [profile, setProfile] = useState<Profile>({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    dob: new Date("1990-01-01"),
    bio: "A passionate student...",
    profilePicture: "/api/placeholder/100/100",
  });

  const [interests, setInterests] = useState<Interest[]>([
    { id: 1, name: "Programming", category: "Technical" },
    { id: 2, name: "Music", category: "Arts" },
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "Improve Math Grade",
      description: "Achieve A grade in Mathematics",
      deadline: new Date("2024-12-31"),
      status: "In Progress",
    },
  ]);

  const [newInterest, setNewInterest] = useState({ name: "", category: "" });
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({});
  const [selectedDate, setSelectedDate] = useState<Date>();

  // Handlers
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // API call to update profile
    console.log("Profile updated:", profile);
  };

  const handleBioUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // API call to update bio
    console.log("Bio updated:", profile.bio);
  };

  const handleProfilePictureUpdate = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // API call to upload profile picture
      console.log("Profile picture uploaded:", file);
    }
  };

  const addInterest = () => {
    if (newInterest.name && newInterest.category) {
      setInterests([...interests, { id: Date.now(), ...newInterest }]);
      setNewInterest({ name: "", category: "" });
    }
  };

  const removeInterest = (id: number) => {
    setInterests(interests.filter((interest) => interest.id !== id));
  };

  const addGoal = () => {
    if (newGoal.title && newGoal.description && newGoal.deadline) {
      setGoals([
        ...goals,
        {
          id: Date.now(),
          title: newGoal.title,
          description: newGoal.description,
          deadline: newGoal.deadline,
          status: "Not Started",
        },
      ]);
      setNewGoal({});
    }
  };

  const removeGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return (
    <div className="container mx-auto py-6 p-10">
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
        </TabsList>

        <TabsContent value="volunteer">
          <VolunteerTab />
        </TabsContent>

        <TabsContent value="address">
          <AddressTab />
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>

        {/* Interests Tab */}
        <TabsContent value="interests">
          <InterestsComponent />
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals">
          <GoalsComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileUpdate;
