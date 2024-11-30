import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ExamsList = () => {
  const exams = [
    { id: 1, subject: "Mathematics", date: "2024-12-01", time: "09:00 AM" },
    { id: 2, subject: "English", date: "2024-12-03", time: "10:30 AM" },
    { id: 3, subject: "Science", date: "2024-12-05", time: "02:00 PM" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exams Schedule</CardTitle>
        <CardDescription>View all upcoming exams</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.subject}</TableCell>
                <TableCell>{exam.date}</TableCell>
                <TableCell>{exam.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ExamsList;