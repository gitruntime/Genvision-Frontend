import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateSubject, useUpdateSubject } from "../store/hooks";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const CreateSubjectPreview = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Create Subject Preview</h1>
      <div className="flex justify-center">
        <CreateSubject />
      </div>
    </div>
  );
};

const CreateSubject = ({ modalAction, subjectData = {} }: any) => {
  const {
    mutate: createMutate,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    error: createError,
  } = useCreateSubject();
  const {
    mutate: isEditMutate,
    isPending: isEditPending,
    isSuccess: isEditSuccess,
    isError: isEditError,
    error: editError,
  } = useUpdateSubject();

  useEffect(() => {
    if (isCreateError || isEditError) {
      const errorMessage = isCreateError
        ? createError?.response?.data?.message ||
          "Uh oh! Something went wrong during creation."
        : isEditError
        ? editError?.response?.data?.message ||
          "Uh oh! Something went wrong during editing."
        : "Uh oh! Something went wrong.";

      toast({
        variant: "destructive",
        // @ts-ignore
        title: errorMessage,
        description: "Try Again",
      });
    }

    if (isCreateSuccess || isEditSuccess) {
      modalAction(false);
      toast({
        variant: "success",
        title: `Class ${isCreateSuccess ? "created" : "updated"} Successfully.`,
      });
    }
  }, [isCreateError, isCreateSuccess, isEditError, isEditSuccess]);
  return (
    <>
      {(isCreatePending || isEditPending) && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}

      <DialogHeader>
        <DialogTitle>{`${!subjectData ? "Add" : "Edit"} Subjects`}</DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Subject Name</Label>
          <Input id="name" placeholder="Enter subject name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">Subject Code</Label>
          <Input id="code" placeholder="Enter subject code" />
        </div>
        <Button className="w-full">Create Subject</Button>
      </form>
    </>
  );
};

export default CreateSubject;
