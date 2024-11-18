import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, Check } from "lucide-react";
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

const ClassCard = ({ className, selected, onClick }) => (
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
  const toggleClass = (className) => {
    setSelectedClasses((prev) =>
      prev.includes(className)
        ? prev.filter((c) => c !== className)
        : [...prev, className]
    );
  };

  return (
    <div className="flex">
      <div className="flex-[27%]  overflow-y-scroll max-h-[500px] hide-scrollbar">
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
      <div className="flex-[65%]">
        <form className="space-y-6">
          <div className="flex flex-row gap-4 p-4">
            <div className="flex-[35%]">
              <div className="space-y-2">
                <Label htmlFor="examName">Exam Name</Label>
                <Input
                  id="examName"
                  placeholder="Enter exam name"
                  className="max-w-md w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  placeholder="Start Date"
                  className="max-w-md w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  placeholder="End Date"
                  className="max-w-md w-full"
                />
              </div>

              <div className="space-y-2 relative">
                <div className="flex justify-between items-center">
                  <Label className="text-lg">Select Classes</Label>
                  <div className="text-sm text-gray-500">
                    {selectedClasses.length} classes selected
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {classes.map((className) => (
                    <ClassCard
                      key={className}
                      className={className}
                      selected={selectedClasses.includes(className)}
                      onClick={() => toggleClass(className)}
                    />
                  ))}
                </div>

                {selectedClasses.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-500 mr-2">
                      Selected:
                    </span>
                    {selectedClasses.map((className) => (
                      <span
                        key={className}
                        className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                      >
                        {className}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <Button
                className="w-full mt-4"
                disabled={selectedClasses.length === 0}
              >
                Create Exam with ({selectedClasses.length} classes)
              </Button>
            </div>
            <div className="flex-[65%] max-h-[500px] overflow-scroll hide-scrollbar">
              {selectedClasses && selectedClasses.length > 0 ? (
                <Accordion type="single" collapsible>
                  {selectedClasses.map((value, index) => (
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger>
                        {value}{" "}
                        <Badge
                          variant={"outline"}
                          className="border-red-500 text-red-600"
                        >
                          Date not specified
                        </Badge>{" "}
                        <Badge
                          variant={"outline"}
                          className="border-green-500 text-green-600"
                        >
                          Date specified
                        </Badge>{" "}
                      </AccordionTrigger>
                      <AccordionContent className="max-h-[10%]">
                        {[
                          "History",
                          "Chemistry",
                          "Hindi",
                          "Science",
                          "Maths",
                          "Mlaayalam",
                          "English",
                        ].map(() => (
                          <>
                            <div className="flex gap-4 p-4">
                              <div className="flex-1">
                                <label
                                  htmlFor="subject"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Subject
                                </label>
                                <input
                                  type="text"
                                  id="subject"
                                  placeholder="Subject"
                                  className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                                  disabled
                                />
                              </div>

                              <div className="flex-1">
                                <label
                                  htmlFor="maxMarks"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Max Marks
                                </label>
                                <input
                                  type="number"
                                  id="maxMarks"
                                  placeholder="Max Marks"
                                  className="w-full px-3 py-2 border rounded-md"
                                />
                              </div>

                              <div className="flex-1">
                                <label
                                  htmlFor="date"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Date
                                </label>
                                <input
                                  type="time"
                                  id="date"
                                  className="w-full px-3 py-2 border rounded-md"
                                />
                              </div>
                              <div className="flex-1">
                                <label
                                  htmlFor="date"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Date
                                </label>
                                <input
                                  type="date"
                                  id="date"
                                  className="w-full px-3 py-2 border rounded-md"
                                />
                              </div>
                              <div className="flex-1">
                                <label
                                  htmlFor="date"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Date
                                </label>
                                <input
                                  type="date"
                                  id="date"
                                  className="w-full px-3 py-2 border rounded-md"
                                />
                              </div>
                            </div>
                          </>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div
                  className={`flex flex-1 items-center h-full justify-center rounded-lg border border-dashed shadow-sm`}
                  x-chunk="dashboard-02-chunk-1"
                >
                  <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                      No Subjects
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      No Subjects where selected
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamList;
