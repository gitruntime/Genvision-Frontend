import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";
import { useListTEducation } from "../store/hooks";
import { useParams } from "react-router-dom";

export const EducationTab: FC = () => {
  const { id } = useParams<{ id: string }>();
  // const {  }
  const { data, isError, isLoading, isSuccess } = useListTEducation(id);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error Occured...</p>;
  return (
    <>
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Education</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <PlusCircle className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {data &&
              data.length > 0 &&
              data.map((datas) => {
                <div className="flex gap-4 items-start" key={datas.id}>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg font-bold">
                        {datas.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-lg">{datas.name}</h3>
                    <p className="text-sm text-gray-600">
                      Computer Engineering
                    </p>
                    <p className="text-sm text-gray-500">Jan 2019 - Mar 2024</p>
                  </div>
                </div>;
                <Separator />;
              })}

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-bold">IIT</span>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-lg">
                  Indian Institute of Technology
                </h3>
                <p className="text-sm text-gray-600">Computer Engineering</p>
                <p className="text-sm text-gray-500">Jan 2019 - Mar 2024</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
