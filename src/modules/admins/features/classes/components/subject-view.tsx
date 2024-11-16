import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";

export const SubjectListPreview = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Subject List Preview</h1>
      <SubjectList />
    </div>
  );
};

const SubjectList = () => {
  const subjects = [
    { id: 1, name: "Mathematics", code: "MATH101" },
    { id: 2, name: "Science", code: "SCI101" },
    { id: 3, name: "English", code: "ENG101" },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Subjects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Name</th>
                <th className="text-left p-4 font-medium">Code</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{subject.name}</td>
                  <td className="p-4">{subject.code}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectList;