import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC, useState } from "react";

// Define the types for form data (if you want to manage form state)
interface PermissionFormData {
  name: string;
  codeName: string;
}

export const PermissionView: FC = () => {
  // Manage form state using useState (optional)
  const [formData, setFormData] = useState<PermissionFormData>({
    name: "",
    codeName: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };



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
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="max-w-md"
                />
              </div>
              <div>
                <Label htmlFor="codeName">Code Name</Label>
                <Input
                  type="text"
                  id="codeName"
                  value={formData.codeName}
                  onChange={handleChange}
                  placeholder="Code Name"
                  className="max-w-md"
                />
              </div>
              <Button className="max-w-md">
                Update
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
};
