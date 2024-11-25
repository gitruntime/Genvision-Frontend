import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trophy } from "lucide-react";
import {
  useSAddressListAPI,
  useSInterestListAPI,
  useViewStudents,
} from "../store/hooks";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const OverviewTabSkeleton = () => {
  return (
    <>
      {/* Profile Card */}
      <Card className="col-span-1 relative">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center">
            {/* Avatar Skeleton */}
            <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse mb-4" />
            {/* Name Skeleton */}
            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mb-2" />
            {/* ID Skeleton */}
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
          </div>

          {/* About Section */}
          <div className="mt-4">
            <div className="h-5 w-20 bg-gray-200 animate-pulse rounded mb-2" />
            {/* Phone and Email Skeletons */}
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
              </div>
            ))}
          </div>

          {/* Address Section */}
          <div className="mt-4">
            <div className="h-5 w-24 bg-gray-200 animate-pulse rounded mb-2" />
            {/* Address Details Skeletons */}
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-36 bg-gray-200 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Class Information Card */}
      <Card className="col-span-2">
        <CardHeader>
          <div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="h-12 bg-gray-200 animate-pulse rounded"
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Card */}
      <Card className="col-span-2">
        <CardHeader>
          <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-4">
                {/* Avatar Skeleton */}
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 w-48 bg-gray-200 animate-pulse rounded mb-2" />
                  <div className="h-3 w-16 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
          {/* View All Button Skeleton */}
          <div className="mt-4 h-8 w-24 bg-gray-200 animate-pulse rounded" />
        </CardContent>
      </Card>
    </>
  );
};

const OverviewTab = ({ studentId }) => {
  const {
    data: STUDENT_DATA,
    isLoading: STUDENT_DATA_LOADING,
    isSuccess: STUDENT_DATA_SUCCESS,
  } = useViewStudents(studentId);

  const { data: STUDENT_ADDRESSES, isLoading: STUDENT_ADDRESSES_LOADING } =
    useSAddressListAPI(studentId);

  const { data: INTEREST_DATA, isLoading: isInterestLoading } =
    useSInterestListAPI(studentId);

  return (
    <div className="grid grid-cols-3 gap-4">
      {STUDENT_DATA_LOADING && STUDENT_ADDRESSES_LOADING ? (
        <OverviewTabSkeleton />
      ) : (
        <>
          <Card className="col-span-1 relative">
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="absolute top-2 right-2">
                  <MoreHorizontal className="w-6 h-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Edit Information</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>NS</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">
                  {STUDENT_DATA?.data.fullName}
                </h2>
                {/* <p className="text-sm text-gray-500">d100385834</p> */}
              </div>
              <div className="mt-4">
                <h2 className="text-md font-semibold">About</h2>
                <p className="text-sm">
                  Phone: <strong>{STUDENT_DATA?.data.phoneNumber}</strong>
                </p>
                <p className="text-sm">
                  Email: <strong>{STUDENT_DATA?.data.email}</strong>
                </p>
              </div>
              {STUDENT_ADDRESSES?.data.length > 0 && (
                <div className="mt-4">
                  <h2 className="text-md font-semibold">Address</h2>
                  {STUDENT_ADDRESSES?.data.map((address) => (
                    <>
                      <p className="text-sm">
                        Address: <strong>{address.streetAddress}</strong>
                      </p>
                      <p className="text-sm">
                        City:{" "}
                        <strong>
                          {address.city}, {address.state}, {address.country}
                        </strong>
                      </p>
                      <p className="text-sm">
                        Postcode: <strong>{address.pincode}</strong>
                      </p>
                    </>
                  ))}
                  <Separator className="my-2" />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-extrabold">Interest</p>
              <div className="grid grid-cols-2 gap-4">
                {INTEREST_DATA?.data.map((interest) => (
                  <div
                    key={interest.id}
                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{interest.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-extrabold">Goals</p>
              <div className="space-y-6">
                {/* {goals.map((goal) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium flex items-center gap-2">
                          {goal.title}
                          {goal.progress === 100 && (
                            <Trophy className="w-4 h-4 text-yellow-500" />
                          )}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {goal.description}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                      >
                        {goal.status}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <Progress value={goal.progress} className="h-2" />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{goal.progress}% Complete</span>
                        <span>
                          Due: {new Date(goal.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
              {/* <table className="w-full">
                    <thead>
                      <tr className="text-left">
                        <th>Job title</th>
                        <th>Department</th>
                        <th>Manager</th>
                        <th>Hire date</th>
                        <th>Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Creative Associate</td>
                        <td>Project Management</td>
                        <td>Alex Foster</td>
                        <td>May 15, 2024</td>
                        <td>Metro DC</td>
                      </tr>
                      <tr>
                        <td>Marketing Team</td>
                        <td>Leadership</td>
                        <td>Jana Stanner</td>
                        <td>Sep 02, 2024</td>
                        <td>Bergen, NJ</td>
                      </tr>
                    </tbody>
                  </table> */}
            </CardContent>
          </Card>
          {/* 
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
                    <p className="text-xs text-gray-500">10:23 PM</p>
                  </div>
                </div>
              </div>
              <Button variant="link" className="mt-4">
                View all
              </Button>
            </CardContent>
          </Card> */}
        </>
      )}

      {/* <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Compensation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">$12,500 USD per month</p>
                  <p className="text-sm text-gray-500">
                    Effective: May 15, 2025
                  </p>
                  <Button variant="link" className="mt-4">
                    View all
                  </Button>
                </CardContent>
              </Card> */}
    </div>
  );
};

export default OverviewTab;
