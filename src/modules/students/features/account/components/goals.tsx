import React, { useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import {
  useGoalCreateAPI,
  useGoalDeleteAPI,
  useGoalUpdateAPI,
  useListGoals,
} from "../store/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const GoalsComponent = () => {
  const [editingGoal, setEditingGoal] = React.useState<any>(null);

  const {
    data: GOALS,
    isLoading: isGoalLoading,
  } = useListGoals();

  const {
    mutate: createMutate,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    error: createError,
  } = useGoalCreateAPI();

  const {
    mutate: updateMutate,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    error: updateError,
  } = useGoalUpdateAPI();

  const {
    mutate: deleteMutate,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
  } = useGoalDeleteAPI();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      type: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be less than 100 characters"),
      description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must be less than 500 characters"),
      type: Yup.string()
        .oneOf(["long term", "short term"], "Invalid goal type")
        .required("Goal type is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (editingGoal) {
        updateMutate([editingGoal?.id, values]);
        setEditingGoal(null);
      } else {
        createMutate(values);
      }
      resetForm();
    },
  });

  useEffect(() => {
    if (isCreateError || isUpdateError || isDeleteError) {
      toast({
        variant: "destructive",
        // @ts-ignore
        title: createError
        // @ts-ignore
          ? createError.response?.data.message
          : deleteError
          // @ts-ignore
          ? deleteError.response?.data.message
          // @ts-ignore
          : updateError?.response?.data.message,
      });
    }

    if (isCreateSuccess || isUpdateSuccess || isDeleteSuccess) {
      toast({
        variant: "success",
        title: `Goal ${
          isCreateSuccess ? "created" : isDeleteSuccess ? "deleted" : "updated"
        } Successfully.`,
      });
    }
  }, [
    isCreateError,
    isCreateSuccess,
    isUpdateError,
    isUpdateSuccess,
    isDeleteSuccess,
  ]);

  const startEditing = (goal:any) => {
    setEditingGoal(goal);
    formik.setValues({
      name: goal.name,
      description: goal.description,
      type: goal.type,
    });
  };

  const cancelEditing = () => {
    setEditingGoal(null);
    formik.resetForm();
  };

  const removeGoal = (id:any) => {
    deleteMutate(id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals</CardTitle>
        <CardDescription>Set and manage your goals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-4 border-b pb-4"
        >
          {(isCreatePending || isUpdatePending || isDeletePending) && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          )}
          <div>
            <Input
              id="name"
              // @ts-ignore
              name="name"
              placeholder="Goal name"
              {...formik.getFieldProps("name")}
              className={
                formik.errors.name && formik.touched.name
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>

          <div>
            <Textarea
              id="description"
              // @ts-ignore
              name="description"
              placeholder="Goal description"
              {...formik.getFieldProps("description")}
              className={
                formik.errors.description && formik.touched.description
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </div>
            )}
          </div>

          <div>
            <Select
              name="type"
              onValueChange={(value) => formik.setFieldValue("type", value)}
              value={formik.values.type}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Goal Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="long term">Long Term</SelectItem>
                <SelectItem value="short term">Short Term</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.type && formik.errors.type && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.type}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full">
            {editingGoal ? "Update Goal" : "Add Goal"}
          </Button>
          {editingGoal && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={cancelEditing}
            >
              Cancel Editing
            </Button>
          )}
        </form>

        <div className="space-y-4">
          {isGoalLoading
            ? // Skeleton Loader
              [...Array(3)].map((_, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <Skeleton className="h-6 w-1/3 mb-2" />{" "}
                        {/* Goal title */}
                        <Skeleton className="h-4 w-2/3" />{" "}
                        {/* Goal description */}
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-8" /> {/* Edit button */}
                        <Skeleton className="h-8 w-8" /> {/* Delete button */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            : GOALS?.data.map((goal: any) => (
                <Card key={goal.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{goal.name}</h4>
                        <p className="text-sm text-gray-500">
                          {goal.description}
                        </p>
                        <Badge>
                          <p>{goal.type}</p>
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditing(goal)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Goal</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this goal? This
                                action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => removeGoal(goal.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalsComponent;
