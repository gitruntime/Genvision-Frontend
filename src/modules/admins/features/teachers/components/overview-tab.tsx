import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { FC, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { TeacherEditComponent } from "./teacher-edit";
import { useListTAddress, useViewTeacher } from "../store/hooks";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export const OverviewTab: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { id } = useParams<any>();
  const openDialog = () => setIsModalOpen(true);
  const { data: teacherProfile, isPending: isProfileLoading } =
    useViewTeacher(id as string);

  const { data: teacherAddress, isPending: isAddressPending } =
    useListTAddress(id as string);

  console.log(teacherAddress, "teacher address");

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
            {isProfileLoading ? (
              <>
                <Skeleton className="h-6 w-full mb-2" />
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={openDialog}>
                  Edit Information
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        {!isProfileLoading && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <TeacherEditComponent
            // @ts-ignore
              teacher={teacherProfile}
              open={isModalOpen}
              onUpdateChange={setIsModalOpen}
            />
          </Dialog>
        )}
        <CardContent className="pt-6">
          {isProfileLoading ? (
            <>
              <div className="flex flex-col items-center">
                <Skeleton className="h-24 w-24 rounded-full mb-4" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-full" />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>NS</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">
                  {teacherProfile.fullName}
                </h2>
                <p className="text-sm text-gray-500">
                  {teacherProfile.username || ""}
                </p>
              </div>
              <div className="mt-4">
                <h2 className="text-md font-semibold">About</h2>
                <p className="text-sm">
                  Phone: <strong>{teacherProfile.phoneNumber}</strong>
                </p>
                <p className="text-sm">
                  Email: <strong>{teacherProfile.email}</strong>
                </p>
              </div>
            </>
          )}

          {isAddressPending ? (
            <>
              <Skeleton className=" mt-4 h-20 w-full mb-2" />
              <Skeleton className=" mt-4 h-20 w-full mb-2" />
            </>
          ) : (
            <>
              {teacherAddress &&
                teacherAddress.length > 0 &&
                teacherAddress.map((address:any) => (
                  <div className="mt-4" key={address.id}>
                    <h6 className="text-sm font-semibold">{`${address.addressType} Address`}</h6>
                    <>
                      <div className="flex justify-between items-center  rounded-md mt-2">
                        {/* <div>
                        <Badge variant={"outline"}>{address.addressType}</Badge>
                        </div> */}
                        <div>
                          <p className="text-sm">
                            Address: <strong>{address.streetAddress}</strong>
                          </p>
                          <p className="text-sm">
                            City: <strong>{address.city}</strong>
                          </p>
                          <p className="text-sm">
                            State: <strong>{address.state}</strong>
                          </p>
                          <p className="text-sm">
                            Postcode: <strong>{address.pincode}</strong>
                          </p>
                          <p className="text-sm">
                            Country: <strong>{address.country}</strong>
                          </p>
                          <p className="text-sm">
                            Phone Number: <strong>{address.phoneNumber}</strong>
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-2 text-gray-500 hover:text-gray-700">
                              <Edit className="w-5 h-5" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </>
                  </div>
                ))}
            </>
          )}
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
