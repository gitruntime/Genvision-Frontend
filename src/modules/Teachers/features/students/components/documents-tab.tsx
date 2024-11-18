import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";

interface DocumentItem {
  name: string;
  img1: string;
  img2: string;
}

const documentData: DocumentItem[] = [
  {
    name: "Aadhaar Card",
    img1: "https://via.placeholder.com/150?text=Aadhaar+Front",
    img2: "https://via.placeholder.com/150?text=Aadhaar+Back",
  },
  {
    name: "PAN Card",
    img1: "https://via.placeholder.com/150?text=PAN+Front",
    img2: "https://via.placeholder.com/150?text=PAN+Back",
  },
  // Add more documents as needed
];

export const Documents: FC = () => {
  return (
    <Card className="container mx-auto p-6">
      <h2 className="text-lg font-bold mb-4">Uploaded Documents</h2>
      <div className="flex flex-col gap-4 ">
        {documentData.map((doc, index) => (
          <Card key={index} className="shadow-sm">
            <CardContent className="pt-4">
              <h3 className="font-semibold text-md mb-4">{doc.name}</h3>
              <div className="flex gap-4">
                <div>
                  <img
                    src={doc.img1}
                    alt={`${doc.name} Front`}
                    className="rounded-md border w-40"
                  />
                  <p className="text-center text-sm mt-2">Front</p>
                </div>
                <div>
                  <img
                    src={doc.img2}
                    alt={`${doc.name} Back`}
                    className="rounded-md border w-40"
                  />
                  <p className="text-center text-sm mt-2">Back</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Card>
  );
};
