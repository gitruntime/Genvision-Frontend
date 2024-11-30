import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import three from "../../../assets/3d art.png";
import { useAIPrompt } from "../store/hooks";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  Code, GraduationCap, Inbox, UserPlus, BadgeCheck, Users,
  Languages,
} from "lucide-react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";


const stepIcons: any = {
    Code: <Code className='h-4 w-4' />,
    GraduationCap: <GraduationCap className='h-4 w-4' />,
    Language: <Languages className='h-4 w-4' />,
    Inbox: <Inbox className='h-4 w-4' />,
    UserPlus: <UserPlus className='h-4 w-4' />,
    BadgeCheck: <BadgeCheck className='h-4 w-4' />,
    Users: <Users className='h-4 w-4' />,
};


const AnatomyDashboard = () => {
  const { id } = useParams();
  const { data, isLoading } = useAIPrompt(id);
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-0 mt-3">
      {isLoading && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-32" /> {/* Simulates the title */}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Skeleton lines simulating content */}
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      )}
      {!isLoading && data?.data.length > 0
        ? data?.data.map((ai: any) => {
            if (ai.id === 2) {
              const result = ai.result;
              return (
                <>
                  <Card className="w-full" key={ai.id}>
                    <CardHeader>
                      <CardDescription>{ai.prompt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {result.chartData.haveData ? (
                        <div className="grid grid-cols-[60%_40%] gap-2">
                          {/* Skill Radar Chart */}
                          <div className="flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-4">
                              Skill Radar Chart
                            </h3>
                            <RadarChart
                              width={400}
                              height={300}
                              data={result.chartData.chart}
                            >
                              <PolarGrid />
                              <PolarAngleAxis dataKey="skill" />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} />
                              <Radar
                                dataKey="value"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.6}
                              />
                            </RadarChart>
                          </div>

                          {/* Detailed Skill Breakdown */}
                          <div>
                            <h3 className="text-lg font-semibold mb-4">
                              Skill Breakdown
                            </h3>
                            <div className="space-y-4">
                              {result.chartData.chart.map((skill : any, index : any) => (
                                <div key={index} className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">
                                      {skill.skill}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      {skill.value}%
                                    </span>
                                  </div>
                                  <Progress
                                    value={skill.value}
                                    className="w-full"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                              <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>
                                  Cannot Process the Request For the Skill
                                  Assessment
                                </AlertTitle>
                                <AlertDescription>
                                  Student data is limited for now can't process
                                  the request
                                </AlertDescription>
                              </Alert>
                      )}
                      {result.careerData.haveData ? (
                        <div className="overflow-x-auto p-4">
                          <table className="min-w-full table-auto border-collapse">
                            <TableHead>
                              Potential Career path
                              {/* <TableRow className="bg-gray-100 text-left">
                                <TableCell className="px-4 py-2 font-semibold text-gray-700"></TableCell>
                                <TableCell className="px-4 py-2 font-semibold text-gray-700"></TableCell>
                              </TableRow> */}
                            </TableHead>
                            <TableBody>
                              {result.careerData.career.map((career : any, index : any) => (
                                <TableRow key={index} className="border-b">
                                  <TableCell className="px-4 py-2 text-gray-700">
                                    {career.role}
                                  </TableCell>
                                  <TableCell className="px-4 py-2 text-gray-600">
                                    <h4 className="scroll-m-20 text-sm font-semibold tracking-tight">
                                      {career.description}
                                    </h4>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </table>
                        </div>
                      ) : (
                              <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>
                                  Cannot Process the Request For the Potential
                                  Career Path
                                </AlertTitle>
                                <AlertDescription>
                                  Student data is limited for now can't process
                                  the request
                                </AlertDescription>
                              </Alert>
                      )}
                    </CardContent>
                  </Card>
                </>
              );
            }
            if (ai.id === 3) {
              const result = ai.result
              return (
                <>
                  <Card className="w-full mt-4" key={ai.id}>
                    <CardHeader>
                      <CardDescription>{ai.prompt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {result.roadmapData.haveData ? (
                        <div className="max-w-6xl mx-auto p-6 bg-gray-50">
                          <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                              {result.roadmapData.roadmap.title}
                            </h1>
                            <p className="text-xl text-gray-600">
                            {result.roadmapData.roadmap.subtitle}
                            </p>
                            <div className="mt-4 bg-blue-100 inline-block px-4 py-2 rounded-full">
                              <span className="font-semibold text-blue-800">
                                Estimated Timeline:{" "}
                                {result.roadmapData.roadmap.timeline}
                              </span>
                            </div>
                          </div>

                          <div className="grid gap-8">
                            {/* Key Steps Section */}
                            <div className="bg-white shadow-lg rounded-xl p-6">
                              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                                Key Learning Steps
                              </h2>
                              {result.roadmapData.roadmap.key_steps.map(
                                (step :any, _:any) => {
                                  // const StepIcon = stepIcons[index];
                                  return (
                                    <div
                                      key={step.step}
                                      className="mb-4 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                                    >
                                      <div className="flex items-center mb-2">
                                       {stepIcons[step.icon] || null}
                                        <h3 className="text-lg font-semibold text-gray-800">
                                          {step.step}
                                        </h3>
                                      </div>
                                      <div className="pl-8">
                                        <p className="text-gray-600 mb-1">
                                          <strong>Skills:</strong>{" "}
                                          {step.skills.join(", ")}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          <strong>Timeframe:</strong>{" "}
                                          {step.timeframe}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>

                            {/* Challenges Section */}
                            <div className="bg-white shadow-lg rounded-xl p-6">
                              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                                Potential Challenges
                              </h2>
                              {result.roadmapData.roadmap.potential_challenges.map(
                                (challenge: any, _ : any) => {
                                  // const ChallengeIcon = challengeIcons[index];
                                  return (
                                    <div
                                      key={challenge.challenge}
                                      className="mb-4 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-all"
                                    >
                                      <div className="flex items-center mb-2">
                                        {/* <ChallengeIcon
                                          className="mr-3 text-red-600"
                                          size={24}
                                        /> */}
                                        <h3 className="text-lg font-semibold text-gray-800">
                                          {challenge.challenge}
                                        </h3>
                                      </div>
                                      <p className="text-gray-600 pl-8">
                                        {challenge.strategy}
                                      </p>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Card className="w-full">
                          <CardHeader>
                            <CardDescription>{ai.prompt}</CardDescription>
                            <CardContent>
                              <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>
                                  Cannot Process the Request For the Roadmap
                                </AlertTitle>
                              </Alert>
                            </CardContent>
                          </CardHeader>
                        </Card>
                      )}
                    </CardContent>
                  </Card>
                </>
              );
            }
          })
        : null}
    </main>
  );
};

export default AnatomyDashboard;
