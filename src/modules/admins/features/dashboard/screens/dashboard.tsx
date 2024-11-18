import { Users, GraduationCap, Calendar, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const SchoolDashboard = () => {
  // Sample data for charts
  const attendanceData = [
    { month: "Jan", students: 92, teachers: 96 },
    { month: "Feb", students: 94, teachers: 98 },
    { month: "Mar", students: 91, teachers: 95 },
    { month: "Apr", students: 95, teachers: 97 },
    { month: "May", students: 93, teachers: 99 },
    { month: "Jun", students: 90, teachers: 96 },
  ];

  const performanceData = [
    { subject: "Math", score: 85 },
    { subject: "Science", score: 78 },
    { subject: "English", score: 88 },
    { subject: "History", score: 82 },
    { subject: "Arts", score: 90 },
  ];

  const genderDistribution = [
    { name: "Male", value: 540 },
    { name: "Female", value: 460 },
  ];

  const COLORS = ["#4f46e5", "#ec4899"];

  const upcomingEvents = [
    { id: 1, title: "Annual Sports Day", date: "2024-11-20", type: "Sports" },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      date: "2024-11-25",
      type: "Meeting",
    },
    {
      id: 3,
      title: "Science Exhibition",
      date: "2024-12-05",
      type: "Academic",
    },
  ];

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-3">
      {/* Header */}
      <div className="mb-8">
        {/* Quick Access Buttons */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 mt-6">
          <Button variant="outline" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Students
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" /> Teachers
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Classes
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Schedule
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 hidden sm:flex"
          >
            <BarChart3 className="h-4 w-4" /> Reports
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 hidden sm:flex"
          >
            <Settings className="h-4 w-4" /> Settings
          </Button>
        </div> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,000</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Teachers
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Attendance
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.4%</div>
            <p className="text-xs text-muted-foreground">
              +4.3% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Next event in 3 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>
              Monthly attendance percentage for students and teachers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="#4f46e5"
                    name="Students"
                  />
                  <Line
                    type="monotone"
                    dataKey="teachers"
                    stroke="#ec4899"
                    name="Teachers"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Performance</CardTitle>
            <CardDescription>Average scores by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Student Distribution</CardTitle>
            <CardDescription>Gender ratio of students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {genderDistribution.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {genderDistribution.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Schedule for the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <Calendar className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{event.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default SchoolDashboard;
