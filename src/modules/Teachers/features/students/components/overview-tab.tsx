import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/modules/Teachers/apiConfig/Interceptor";
import { MoreHorizontal, Loader as LucideLoader } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const OverviewTab = () => {
  const [userDetails, setUserDetails] = useState<any>();
  const [addressDetails, setAddressDetails] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const { id } = useParams(); // Get the id from the URL

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loader
      try {
        const userResponse = await api.get(`/teacher/students/${id}`);
        setUserDetails(userResponse.data?.data);

        const addressResponse = await api.get("/teacher/addresses");
        setAddressDetails(addressResponse.data?.data);
      } catch (err) {
        console.error("Failed to fetch details:", err);
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false); // Stop loader
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {loading ? (
        <div className="col-span-3 flex justify-center items-center h-[400px]">
          <LucideLoader className="animate-spin h-8 w-8 text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="col-span-3 text-center text-red-500">{error}</div>
      ) : (
        <>
          <Card className="col-span-1 relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="absolute top-2 right-2">
                  <MoreHorizontal className="w-6 h-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Edit Profile Picture</DropdownMenuItem>
                <DropdownMenuItem>Edit Information</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>NS</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{userDetails?.fullName}</h2>
                <p className="text-sm text-gray-500">{userDetails?.username}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-md font-semibold">About</h2>
                <p className="text-sm">
                  Phone: <strong>{userDetails?.phoneNumber}</strong>
                </p>
                <p className="text-sm">
                  Email: <strong>{userDetails?.email}</strong>
                </p>
              </div>
              <div className="mt-4">
                <h2 className="text-md font-semibold">Address</h2>
                {addressDetails?.map((address: any, index: number) => (
                  <p key={index} className="text-sm leading-6">
                    <u>
                      <strong>{address?.addressType} Address: </strong>
                    </u>
                    {address?.streetAddress}, {address?.city}, {address?.state},{" "}
                    {address?.pincode}, {address?.country}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Class Information</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add class information content */}
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Avatar className="mr-2">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>JM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      John Miller has login on Jul 13, 2024
                    </p>
                    <p className="text-xs text  -gray-500">10:23 PM</p>
                  </div>
                </div>
              </div>
              <Button variant="link" className="mt-4">
                View all
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
