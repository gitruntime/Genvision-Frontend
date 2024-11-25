import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ClassmatesList = () => {
  const classmates = [
    { id: 1, name: "John Doe", grade: "10th", email: "john@school.com" },
    { id: 2, name: "Jane Smith", grade: "10th", email: "jane@school.com" },
    { id: 3, name: "Bob Wilson", grade: "10th", email: "bob@school.com" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Classmates</CardTitle>
        <CardDescription>View all your classmates</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classmates.map((classmate) => (
              <TableRow key={classmate.id}>
                <TableCell>{classmate.name}</TableCell>
                <TableCell>{classmate.grade}</TableCell>
                <TableCell>{classmate.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ClassmatesList;