import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";

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
    { id: 4, name: "English", code: "ENG101" },
    { id: 5, name: "English", code: "ENG101" },
    { id: 6, name: "English", code: "ENG101" },
    { id: 7, name: "English", code: "ENG101" },
    { id: 8, name: "English", code: "ENG101" },
  ];

  return (
    <div className="flex">
      <div className="flex-1 overflow-y-scroll max-h-[500px] hide-scrollbar">
        <table className="w-full table-auto">
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
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-1">
        <div
          className={`flex flex-1 items-center h-full justify-center rounded-lg border border-dashed shadow-sm`}
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">No Subjects</h3>
            <p className="text-sm text-muted-foreground">
              No Subjects where selected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectList;
