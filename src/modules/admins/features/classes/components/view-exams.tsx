import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";

export const ExamListPreview = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Exam List Preview</h1>
      <ExamList />
    </div>
  );
};

const ExamList = () => {
  const exams = [
    {
      id: 1,
      name: "Mid-term Exam",
      classes: ["Class 6A", "Class 6B", "Class 7A"],
    },
    {
      id: 2,
      name: "Final Exam",
      classes: ["Class 8A", "Class 8B", "Class 9A"],
    },
  ];

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left p-4 font-medium">Exam Name</th>
          <th className="text-left p-4 font-medium">Classes</th>
          <th className="text-left p-4 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        {exams.map((exam) => (
          <tr key={exam.id} className="border-b hover:bg-gray-50">
            <td className="p-4">{exam.name}</td>
            <td className="p-4">{exam.classes.join(", ")}</td>
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
  );
};

export default ExamList;
