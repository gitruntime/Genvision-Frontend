import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Pencil, Trash, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const VolunteerForm = ({ onSubmit, initialValues, onCancel }) => {
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: initialValues || {
      organization: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
      hoursPerWeek: '',
    },
    validationSchema: Yup.object({
      organization: Yup.string().required('Organization is required'),
      role: Yup.string().required('Role is required'),
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date().min(
        Yup.ref('startDate'),
        'End date must be after start date'
      ),
      description: Yup.string().required('Description is required'),
      hoursPerWeek: Yup.number()
        .required('Hours per week is required')
        .min(1, 'Must be at least 1 hour')
        .max(168, 'Cannot exceed 168 hours'),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="organization">Organization</Label>
        <Input
          id="organization"
          name="organization"
          value={values.organization}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.organization && errors.organization ? 'border-red-500' : ''}
        />
        {touched.organization && errors.organization && (
          <p className="text-sm text-red-500">{errors.organization}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Input
          id="role"
          name="role"
          value={values.role}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.role && errors.role ? 'border-red-500' : ''}
        />
        {touched.role && errors.role && (
          <p className="text-sm text-red-500">{errors.role}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={values.startDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.startDate && errors.startDate ? 'border-red-500' : ''}
          />
          {touched.startDate && errors.startDate && (
            <p className="text-sm text-red-500">{errors.startDate}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={values.endDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.endDate && errors.endDate ? 'border-red-500' : ''}
          />
          {touched.endDate && errors.endDate && (
            <p className="text-sm text-red-500">{errors.endDate}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.description && errors.description ? 'border-red-500' : ''}
        />
        {touched.description && errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="hoursPerWeek">Hours per Week</Label>
        <Input
          id="hoursPerWeek"
          name="hoursPerWeek"
          type="number"
          value={values.hoursPerWeek}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.hoursPerWeek && errors.hoursPerWeek ? 'border-red-500' : ''}
        />
        {touched.hoursPerWeek && errors.hoursPerWeek && (
          <p className="text-sm text-red-500">{errors.hoursPerWeek}</p>
        )}
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </form>
  );
};

const VolunteerTab = () => {
  const [volunteerRecords, setVolunteerRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const handleAddVolunteer = (values) => {
    if (editingRecord) {
      setVolunteerRecords(records => 
        records.map(record => 
          record.id === editingRecord.id ? { ...values, id: record.id } : record
        )
      );
      toast({
        title: "Volunteer record updated successfully",
        variant: "success",
      });
    } else {
      setVolunteerRecords([...volunteerRecords, { ...values, id: Date.now() }]);
      toast({
        title: "Volunteer record added successfully",
        variant: "success",
      });
    }
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  const handleDeleteVolunteer = (id) => {
    setVolunteerRecords(records => records.filter(record => record.id !== id));
    toast({
      title: "Volunteer record deleted successfully",
      variant: "success",
    });
  };

  const handleEditVolunteer = (record) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  return (
    <TabsContent value="volunteer" className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Volunteer Experience</CardTitle>
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Volunteer Experience
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Hours/Week</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {volunteerRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.organization}</TableCell>
                  <TableCell>{record.role}</TableCell>
                  <TableCell>{new Date(record.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{record.endDate ? new Date(record.endDate).toLocaleDateString() : 'Present'}</TableCell>
                  <TableCell>{record.hoursPerWeek}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditVolunteer(record)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteVolunteer(record.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {volunteerRecords.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No volunteer experience added yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingRecord ? 'Edit Volunteer Experience' : 'Add Volunteer Experience'}
            </DialogTitle>
          </DialogHeader>
          <VolunteerForm
            onSubmit={handleAddVolunteer}
            initialValues={editingRecord}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingRecord(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </TabsContent>
  );
};

export default VolunteerTab;