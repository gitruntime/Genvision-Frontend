import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, 
  AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { CalendarIcon, Pencil, Trash2 } from 'lucide-react';

const GoalsComponent = () => {
  const [goals, setGoals] = React.useState([]);
  const [editingGoal, setEditingGoal] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      deadline: null,
      status: 'PENDING'
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must be less than 100 characters'),
      description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description must be less than 500 characters'),
      deadline: Yup.date()
        .required('Deadline is required')
        .min(new Date(), 'Deadline cannot be in the past'),
      status: Yup.string()
        .oneOf(['PENDING', 'IN_PROGRESS', 'COMPLETED'], 'Invalid status')
    }),
    onSubmit: (values, { resetForm }) => {
      if (editingGoal) {
        setGoals(goals.map(goal => 
          goal.id === editingGoal.id 
            ? { ...values, id: goal.id } 
            : goal
        ));
        setEditingGoal(null);
      } else {
        const newGoal = {
          id: Date.now(),
          ...values
        };
        setGoals([...goals, newGoal]);
      }
      resetForm();
    },
  });

  const startEditing = (goal) => {
    setEditingGoal(goal);
    formik.setValues({
      title: goal.title,
      description: goal.description,
      deadline: goal.deadline,
      status: goal.status
    });
  };

  const cancelEditing = () => {
    setEditingGoal(null);
    formik.resetForm();
  };

  const removeGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals</CardTitle>
        <CardDescription>Set and manage your goals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={formik.handleSubmit} className="space-y-4 border-b pb-4">
          <div>
            <Input
              name="title"
              placeholder="Goal title"
              {...formik.getFieldProps('title')}
              className={formik.errors.title && formik.touched.title ? 'border-red-500' : ''}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
            )}
          </div>

          <div>
            <Textarea
              name="description"
              placeholder="Goal description"
              {...formik.getFieldProps('description')}
              className={formik.errors.description && formik.touched.description ? 'border-red-500' : ''}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
            )}
          </div>

          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    formik.errors.deadline && formik.touched.deadline ? 'border-red-500' : ''
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formik.values.deadline
                    ? format(formik.values.deadline, 'PPP')
                    : 'Set deadline'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formik.values.deadline}
                  onSelect={(date) => formik.setFieldValue('deadline', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {formik.touched.deadline && formik.errors.deadline && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.deadline}</div>
            )}
          </div>

          <Button type="submit" className="w-full">
            {editingGoal ? 'Update Goal' : 'Add Goal'}
          </Button>
          {editingGoal && (
            <Button type="button" variant="outline" className="w-full" onClick={cancelEditing}>
              Cancel Editing
            </Button>
          )}
        </form>

        <div className="space-y-4">
          {goals.map((goal) => (
            <Card key={goal.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{goal.title}</h4>
                    <p className="text-sm text-gray-500">{goal.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge>{goal.status}</Badge>
                      <span className="text-sm text-gray-500">
                        Due: {format(goal.deadline, 'PPP')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => startEditing(goal)}>
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
                            Are you sure you want to delete this goal? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => removeGoal(goal.id)}>
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