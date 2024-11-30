import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useInterestsCreateAPI,
  useInterestsDeleteAPI,
  useListInterests,
} from "../store/hooks";
import { Skeleton } from "@/components/ui/skeleton";

// interface Interest {
//   name: string;
// }

const InterestSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/4" /> {/* Title */}
        <Skeleton className="h-4 w-1/2 mt-2" /> {/* Description */}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {/* Replace interests with placeholders */}
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-8 w-20 rounded" />
          ))}
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" /> {/* Bulk Add Button */}
        </div>
      </CardContent>
    </Card>
  );
};

const InterestsComponent = () => {
  const { toast } = useToast();
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    mutate: createMutate,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    error: createError,
  } = useInterestsCreateAPI();

  const {
    mutate: deleteMutate,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
  } = useInterestsDeleteAPI();

  const bulkFormik = useFormik({
    initialValues: {
      bulkInterests: "",
    },
    validationSchema: Yup.object({
      bulkInterests: Yup.string()
        .required("Please enter interests")
        .min(2, "Input must be at least 2 characters"),
    }),
    onSubmit: (values, { resetForm }) => {
      const interestArray = values.bulkInterests
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length >= 2 && item.length <= 50);

      if (interestArray.length === 0) {
        toast({
          title: "Invalid input",
          description: "Please enter valid interests separated by commas",
          variant: "destructive",
        });
        return;
      }

      createMutate({ interests: interestArray });

      resetForm();

      // toast({
      //   title: `${newInterests.length} interests added successfully`,
      //   variant: "success",
      // });
    },
  });

  useEffect(() => {
    if (isCreateSuccess || isDeleteSuccess) {
      if (isCreateSuccess) {
        setIsDialogOpen(false);
      }
      if (isDeleteSuccess) {
        setSelectedInterests([]);
      }
      toast({
        title: `Interests ${
          isCreateSuccess ? "added" : "deleted"
        } successfully`,
        variant: "success",
      });
    }
    if (isCreateError || isDeleteError) {
      toast({
        title: createError
        // @ts-ignore
          ? createError.response?.data.message
          : deleteError
          // @ts-ignore
          ? deleteError.response?.data.message
          : "Something went wrong",
        variant: "destructive",
      });
    }
  }, [isCreateSuccess, isCreateError, isDeleteError, isDeleteSuccess]);

  const { data: INTERESTS, isLoading: isListLoading } = useListInterests();

  const handleBulkDelete = () => {
    if (selectedInterests.length === 0) {
      toast({
        title: "No interests selected",
        description: "Please select interests to delete",
        variant: "destructive",
      });
      return;
    }

    console.log(selectedInterests, "hjjjjjjjjjjjjjjjjjjjjjjj");

    deleteMutate({ interests: selectedInterests });
  };

  const toggleInterestSelection = (id: number) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.filter((interestId) => interestId !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      {isListLoading ? (
        <InterestSkeleton />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Interests</CardTitle>
            <CardDescription>Manage your interests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {INTERESTS?.data.map((interest: any) => (
                <Badge
                  key={interest.name}
                  variant={
                    selectedInterests.includes(interest.id)
                      ? "default"
                      : "secondary"
                  }
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => toggleInterestSelection(interest.id)}
                >
                  {interest.name}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Bulk Add
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  {(isCreatePending || isDeletePending) && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
                      <Loader2 className="h-8 w-8 animate-spin text-white" />
                    </div>
                  )}
                  <DialogHeader>
                    <DialogTitle>Add Multiple Interests</DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={bulkFormik.handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <Textarea
                        placeholder="Enter interests separated by commas (e.g., Reading, Writing, Coding)"
                        {...bulkFormik.getFieldProps("bulkInterests")}
                        className={
                          bulkFormik.errors.bulkInterests &&
                          bulkFormik.touched.bulkInterests
                            ? "border-red-500"
                            : ""
                        }
                        rows={4}
                      />
                      {bulkFormik.touched.bulkInterests &&
                        bulkFormik.errors.bulkInterests && (
                          <div className="text-red-500 text-sm mt-1">
                            {bulkFormik.errors.bulkInterests}
                          </div>
                        )}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Add Interests</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {selectedInterests.length > 0 && (
              <div className="flex justify-end">
                <Button variant="destructive" onClick={handleBulkDelete}>
                  <X className="h-4 w-4 mr-2" />
                  Delete Selected ({selectedInterests.length})
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default InterestsComponent;
