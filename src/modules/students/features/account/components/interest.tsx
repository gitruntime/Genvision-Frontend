import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
import { X, Plus } from 'lucide-react';

const InterestsComponent = () => {
  const [interests, setInterests] = React.useState([
    { id: 1, name: 'Reading', category: 'Hobbies' },
    { id: 2, name: 'Programming', category: 'Professional' },
  ]);

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Interest name is required')
        .min(2, 'Interest name must be at least 2 characters')
        .max(50, 'Interest name must be less than 50 characters'),
      category: Yup.string()
        .required('Category is required')
        .min(2, 'Category must be at least 2 characters')
        .max(30, 'Category must be less than 30 characters'),
    }),
    onSubmit: (values, { resetForm }) => {
      const newInterest = {
        id: Date.now(),
        name: values.name,
        category: values.category,
      };
      setInterests([...interests, newInterest]);
      resetForm();
    },
  });

  const removeInterest = (id) => {
    setInterests(interests.filter((interest) => interest.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interests</CardTitle>
        <CardDescription>Manage your interests</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <Badge
              key={interest.id}
              variant="secondary"
              className="flex items-center gap-2"
            >
              {interest.name} - {interest.category}
              <button
                onClick={() => removeInterest(interest.id)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                name="name"
                placeholder="Interest name"
                {...formik.getFieldProps('name')}
                className={formik.errors.name && formik.touched.name ? 'border-red-500' : ''}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
              )}
            </div>
            
            <div className="flex-1">
              <Input
                name="category"
                placeholder="Category"
                {...formik.getFieldProps('category')}
                className={formik.errors.category && formik.touched.category ? 'border-red-500' : ''}
              />
              {formik.touched.category && formik.errors.category && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>
              )}
            </div>
            
            <Button type="submit">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InterestsComponent;