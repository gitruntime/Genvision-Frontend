import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

const MOCK_DETAILED_MARKS = {
  semesters: [
    {
      name: "First Semester",
      subjects: [
        {
          name: "Mathematics",
          marks: 85,
          maxMarks: 100,
          topics: [
            { name: "Algebra", marks: 28, maxMarks: 35 },
            { name: "Geometry", marks: 25, maxMarks: 30 },
            { name: "Trigonometry", marks: 32, maxMarks: 35 },
          ],
        },
        {
          name: "Science",
          marks: 78,
          maxMarks: 100,
          topics: [
            { name: "Physics", marks: 26, maxMarks: 35 },
            { name: "Chemistry", marks: 24, maxMarks: 30 },
            { name: "Biology", marks: 28, maxMarks: 35 },
          ],
        },
        {
          name: "English",
          marks: 92,
          maxMarks: 100,
          topics: [
            { name: "Grammar", marks: 30, maxMarks: 35 },
            { name: "Comprehension", marks: 32, maxMarks: 35 },
            { name: "Writing", marks: 30, maxMarks: 30 },
          ],
        },
      ],
      totalMarks: 255,
      maxTotalMarks: 300,
      percentage: 85,
    },
  ],
  classTests: [
    {
      name: "First Class Test",
      subjects: [
        {
          name: "Mathematics",
          marks: 42,
          maxMarks: 50,
          topics: [
            { name: "Linear Equations", marks: 15, maxMarks: 20 },
            { name: "Quadratic Equations", marks: 27, maxMarks: 30 },
          ],
        },
        {
          name: "Science",
          marks: 38,
          maxMarks: 50,
          topics: [
            { name: "Force and Motion", marks: 18, maxMarks: 25 },
            { name: "Energy", marks: 20, maxMarks: 25 },
          ],
        },
        {
          name: "English",
          marks: 45,
          maxMarks: 50,
          topics: [
            { name: "Comprehension", marks: 22, maxMarks: 25 },
            { name: "Essay Writing", marks: 23, maxMarks: 25 },
          ],
        },
      ],
      totalMarks: 125,
      maxTotalMarks: 150,
      percentage: 83.33,
    },
  ],
};

const StudentMarksDetailedDashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [viewType, setViewType] = useState("semesters");

  const renderSubjectDetails = (subjects) => (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Subject</TableHead>
          <TableHead>Marks</TableHead>
          <TableHead>Max Marks</TableHead>
          <TableHead>Percentage</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subjects.map((subject) => (
          <TableRow key={subject.name}>
            <TableCell>{subject.name}</TableCell>
            <TableCell>{subject.marks}</TableCell>
            <TableCell>{subject.maxMarks}</TableCell>
            <TableCell>
              {((subject.marks / subject.maxMarks) * 100).toFixed(2)}%
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedSubject(subject)}
              >
                View Topics
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Detailed Marks Dashboard</CardTitle>
            <Select value={viewType} onValueChange={setViewType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="View Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semesters">Semesters</SelectItem>
                <SelectItem value="classTests">Class Tests</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {viewType === "semesters"
            ? renderSubjectDetails(MOCK_DETAILED_MARKS.semesters[0].subjects)
            : renderSubjectDetails(MOCK_DETAILED_MARKS.classTests[0].subjects)}
        </CardContent>
      </Card>

      {selectedSubject && (
        <Dialog
          open={!!selectedSubject}
          onOpenChange={() => setSelectedSubject(null)}
        >
          <DialogContent className="w-full">
            <DialogHeader>
              <DialogTitle>
                {selectedSubject.name} Detailed Breakdown
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[400px] w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Topic</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Max Marks</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedSubject.topics.map((topic) => (
                    <TableRow key={topic.name}>
                      <TableCell>{topic.name}</TableCell>
                      <TableCell>{topic.marks}</TableCell>
                      <TableCell>{topic.maxMarks}</TableCell>
                      <TableCell className="space-y-2">
                        <Progress
                          value={(topic.marks / topic.maxMarks) * 100}
                          className="w-full"
                        />
                        <span>
                          {((topic.marks / topic.maxMarks) * 100).toFixed(2)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold">
                    <TableCell>Total</TableCell>
                    <TableCell>
                      {selectedSubject.topics.reduce(
                        (sum, topic) => sum + topic.marks,
                        0
                      )}
                    </TableCell>
                    <TableCell>
                      {selectedSubject.topics.reduce(
                        (sum, topic) => sum + topic.maxMarks,
                        0
                      )}
                    </TableCell>
                    <TableCell>
                      {(
                        (selectedSubject.marks / selectedSubject.maxMarks) *
                        100
                      ).toFixed(2)}
                      %
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StudentMarksDetailedDashboard;
