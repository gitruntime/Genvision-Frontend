import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  
  CardHeader,
  
} from "@/components/ui/card";
import {
  DropdownMenu,
  
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDownIcon } from "lucide-react";
import { FC } from "react";



export const Marks: FC = () => {
  const getScoreColor = (score: number) => {
    if (score < 60) return "text-red-500";
    if (score >= 80) return "text-green-500";
    return "text-black";
  };

  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("en", { month: "long" })
  );


    const years = Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => 2000 + i);


  const examTypes = [
    "Unit Test",
    "Special Test",
    "First Half Exam",
    "Leaving Exam",
    "Second Half Exam",
  ];


  return (
    <Card className="w-full max-w-5xl">
      <CardHeader className="flex flex-row items-start justify-end">
        <div className="flex justify-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-xs py-1 px-2">
                Select Month <ChevronDownIcon className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-200">
              {months.map((month) => (
                <DropdownMenuItem  key={month}>{month}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-xs py-1 px-2">
                Select Year <ChevronDownIcon className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-200">
              {years.map((year) => (
                <DropdownMenuItem  key={year}>{year}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-xs py-1 px-2">
                Select Exam Type <ChevronDownIcon className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-200">
              {examTypes.map((examType) => (
                <DropdownMenuItem key={examType}>{examType}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button>Submit</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll No</TableHead>
              <TableHead>Class</TableHead>
              <TableHead></TableHead>
              <TableHead colSpan={4} className="text-center">
                Model exam scores
              </TableHead>
              <TableHead></TableHead>
              <TableHead>Cut off</TableHead>
              {/* <TableHead>Action</TableHead> */}
            </TableRow>
            <TableRow>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead>Maths</TableHead>
              <TableHead>Chemistry</TableHead>
              <TableHead>Biology</TableHead>
              <TableHead>Physics</TableHead>
              <TableHead>English</TableHead>
              <TableHead>Hindi</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell> {index + 1}</TableCell>
                <TableCell>10th</TableCell>
                <TableCell className={getScoreColor(12)}>{12}</TableCell>
                <TableCell className={getScoreColor(40)}>{40}</TableCell>
                <TableCell className={getScoreColor(23)}>{23}</TableCell>
                <TableCell className={getScoreColor(10)}>{10}</TableCell>
                <TableCell className={getScoreColor(76)}>{76}</TableCell>
                <TableCell className={getScoreColor(78)}>{78}</TableCell>
                <TableCell className={getScoreColor(34)}>{34}</TableCell>
                {/* <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={`text-xs py-1 px-2 bg-green-100 text-green-800 hover:bg-green-200`}
                    >
                      {"Unit Test"} <ChevronDownIcon className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Unit Test</DropdownMenuItem>
                    <DropdownMenuItem>First Half</DropdownMenuItem>
                    <DropdownMenuItem>Spcl CL</DropdownMenuItem>
                    <DropdownMenuItem>Second Half</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
