import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const OverviewTab = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
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
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>NS</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">Nicholas Swatz</h2>
            <p className="text-sm text-gray-500">d100385834</p>
          </div>
          <div className="mt-4">
            <h2 className="text-md font-semibold">About</h2>
            <p className="text-sm">
              Phone: <strong>+91 8848285720</strong>
            </p>
            <p className="text-sm">
              Email: <strong>thousi.runtime@gmail.com</strong>
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-md font-semibold">Address</h2>
            <p className="text-sm">
              Address: <strong>Runtime Solutions</strong>
            </p>
            <p className="text-sm">
              City: <strong>Versova, Andheri West</strong>
            </p>
            <p className="text-sm">
              Postcode: <strong>9400047</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Class Information</CardTitle>
        </CardHeader>
        <CardContent>
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
      </Card>

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
