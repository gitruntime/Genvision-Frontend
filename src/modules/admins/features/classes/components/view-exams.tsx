import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import CreateExam from "./create-exams";

export const CreateExamPreview = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Create Exam Preview</h1>
      <div className="flex justify-center">
        <CreateExam />
      </div>
    </div>
  );
};

const ClassCard = ({ className, selected, onClick }:any) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md 
        ${
          selected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:border-blue-200"
        }`}
  >
    <div className="text-sm font-medium">{className}</div>
    {selected && (
      <div className="absolute top-2 right-2 text-blue-500">
        <Check className="w-4 h-4" />
      </div>
    )}
  </button>
);

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
    {
      id: 3,
      name: "Final Exam",
      classes: ["Class 8A", "Class 8B", "Class 9A"],
    },
    {
      id: 4,
      name: "Final Exam",
      classes: ["Class 8A", "Class 8B", "Class 9A"],
    },
    {
      id: 5,
      name: "Final Exam",
      classes: ["Class 8A", "Class 8B", "Class 9A"],
    },
    {
      id: 6,
      name: "Final Exam",
      classes: ["Class 8A", "Class 8B", "Class 9A"],
    },
    {
      id: 7,
      name: "Final Exam",
      classes: ["Class 8A", "Class 8B", "Class 9A"],
    },
    {
      id: 8,
      name: "Final Exam",
      classes: ["Class 8A", "Class 8B", "Class 9A"],
    },
    {
      id: 9,
      name: "Final Exam",
      classes: ["Class 8A", "Class 8B", "Class 9A"],
    },
    {
      id: 10,
      name: "Final Exam",
      classes: ["Class 8A", "Class 8B", "Class 9A"],
    },
    {
      id: 11,
      name: "Final Exam",
      classes: ["Class 8A", "Class 8B", "Class 9A"],
    },
  ];

  const classes = [
    "Class 6A",
    "Class 6B",
    "Class 7A",
    "Class 7B",
    "Class 8A",
    "Class 8B",
  ];
  const [selectedClasses, setSelectedClasses] = useState([]);
  const toggleClass = (className: any) => {
    setSelectedClasses((prev: any) =>
      prev.includes(className)
        ? prev.filter((c: any) => c !== className)
        : [...prev, className]
    );
  };

  return (
    <div className="flex">
      <div className="flex-[100%] mt-10 overflow-y-scroll max-h-[500px] hide-scrollbar">
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
      </div>
    </div>
  );
};

export default ExamList;
