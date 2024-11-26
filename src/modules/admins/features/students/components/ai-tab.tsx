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
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
        ? data?.data.map((ai: any) => (
            <Card className="w-full" key={ai.id}>
              <CardHeader>
                <CardDescription>{ai.prompt}</CardDescription>
              </CardHeader>
              <CardContent>
                <Markdown remarkPlugins={[remarkGfm]}>{ai.result}</Markdown>
              </CardContent>
            </Card>
          ))
        : null}
    </main>
  );
};

export default AnatomyDashboard;
