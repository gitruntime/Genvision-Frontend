import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC } from "react";

export const PermissionView: FC = () => {
  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-0 mt-3">
      <Card className="w-full">
          <CardHeader>
            <CardTitle>Permission 1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="max-w-md"
                />
              </div>
              <div>
                <Label htmlFor="codeName">Code Name</Label>
                <Input
                  type="text"
                  id="codeName"
                  placeholder="Code Name"
                  className="max-w-md"
                />
              </div>
              <Button className="max-w-md">Update</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
};
