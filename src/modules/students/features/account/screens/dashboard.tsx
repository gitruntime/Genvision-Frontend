import React from 'react';
import { 
  Book, 
  ClipboardList, 
  LineChart as LineChartIcon, 
  MessageSquare, 
  Bell,
  Calendar,
  Trophy,
  Clock
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const Dashboard = () => {
  // Sample performance data for the line chart
  const performanceData = [
    { month: 'Sep', Mathematics: 85, Physics: 78, Literature: 92 },
    { month: 'Oct', Mathematics: 88, Physics: 82, Literature: 88 },
    { month: 'Nov', Mathematics: 92, Physics: 85, Literature: 90 },
    { month: 'Dec', Mathematics: 90, Physics: 88, Literature: 94 },
  ];

  // Sample assignment completion data for the bar chart
  const assignmentData = [
    { subject: 'Mathematics', completed: 15, pending: 3 },
    { subject: 'Physics', completed: 12, pending: 4 },
    { subject: 'Literature', completed: 10, pending: 2 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Top Stats Row */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Classes
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Next: Mathematics at 10:00 AM
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Assignments
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground">
              3 due this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Average Grade
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A-</div>
            <p className="text-xs text-muted-foreground">
              +5% from last semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Study Hours
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Your academic progress across subjects</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Mathematics" stroke="#8884d8" />
              <Line type="monotone" dataKey="Physics" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Literature" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Middle Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Class Schedule */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your upcoming classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge variant="secondary">10:00 AM</Badge>
                <div>
                  <p className="font-semibold">Mathematics</p>
                  <p className="text-sm text-muted-foreground">Linear Algebra - Room 301</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">11:30 AM</Badge>
                <div>
                  <p className="font-semibold">Physics</p>
                  <p className="text-sm text-muted-foreground">Quantum Mechanics - Lab 2</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">2:00 PM</Badge>
                <div>
                  <p className="font-semibold">Literature</p>
                  <p className="text-sm text-muted-foreground">Modern Poetry - Room 205</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Assignment Status */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Assignment Progress</CardTitle>
            <CardDescription>Subject-wise completion status</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={assignmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#4ade80" name="Completed" />
                <Bar dataKey="pending" fill="#f87171" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Teacher Feedback */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Comments from your teachers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <p className="font-semibold">Physics Professor</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  "Excellent progress in quantum mechanics concepts. Keep working on practical applications."
                </p>
                <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <p className="font-semibold">Mathematics Professor</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  "Great improvement in recent assignments. Consider joining the Math Club."
                </p>
                <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Announcements */}
        {/* <Card>
          <CardHeader>
            <CardTitle>School Announcements</CardTitle>
            <CardDescription>Important updates and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge>New</Badge>
                  <p className="font-semibold">Science Fair Registration Open</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Register for the annual science fair by next Friday. Great opportunity to showcase your projects.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Upcoming</Badge>
                  <p className="font-semibold">Career Counseling Session</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Join us for a career guidance session with industry experts next Wednesday.
                </p>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default Dashboard;