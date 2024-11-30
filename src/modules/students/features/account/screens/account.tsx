import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VolunteerTab from "../components/volunteer-tab";
import AddressTab from "../components/address-tab";
import ProfileTab from "../components/profile-tab";
import InterestsComponent from "../components/interest";
import GoalsComponent from "../components/goals";

const ProfileUpdate = () => {

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
