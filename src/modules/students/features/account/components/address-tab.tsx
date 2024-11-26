import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import {
  useAddressCreateAPI,
  useAddressDeleteAPI,
  useAddressUpdateAPI,
  useListAddress,
} from "../store/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Address Components
const AddressForm = ({
  onSubmit,
  initialValues,
  setIsModalOpen,
  modalAction,
  isEdit,
  setIsEdit,
}: any) => {
  const {
    mutate: createMutate,
    isPending: isCreatePending,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    error: createError,
  } = useAddressCreateAPI();

  const {
    mutate: updateMutate,
    isPending: isUpdatePending,
    isError: isUpdateError,
    isSuccess: isUpdateSuccess,
    error: updateError,
  } = useAddressUpdateAPI(initialValues?.id);

  console.log(initialValues, "thousi..........................");

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues || {
      streetAddress: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      addressType: "",
    },
    validationSchema: Yup.object({
      streetAddress: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      pincode: Yup.number().required("Pin code is required"),
      country: Yup.string().required("Country is required"),
      addressType: Yup.string().required("Address type is required"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        updateMutate({
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          pincode: values.pincode,
          country: values.country,
          addressType: values.addressType,
        });
        setIsEdit(false);
        return;
      }
      createMutate(values);
      return;
    },
  });

  useEffect(() => {
    if (isCreateError || isUpdateError) {
      toast({
        variant: "destructive",
        // @ts-ignore
        title: createError
          ? createError.response?.data.message
          : updateError?.response?.data.message,
      });
    }

    if (isCreateSuccess || isUpdateSuccess) {
      modalAction(false);
      toast({
        variant: "success",
        title: `Address ${
          isCreateSuccess ? "created" : "updated"
        } Successfully.`,
      });
    }
  }, [isCreateError, isCreateSuccess, isUpdateError, isUpdateSuccess]);

  const addressTypes = [
    { value: "Residential", label: "Residential" },
    { value: "Permenant", label: "Permanent" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {(isCreatePending || isUpdatePending) && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="streetAddress">Street</Label>
        <Input
          id="streetAddress"
          name="streetAddress"
          value={values.streetAddress}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            touched.streetAddress && errors.streetAddress
              ? "border-red-500"
              : ""
          }
        />
        {touched.streetAddress && errors.streetAddress && (
          <p className="text-sm text-red-500">{errors.streetAddress}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.city && errors.city ? "border-red-500" : ""}
          />
          {touched.city && errors.city && (
            // @ts-ignore
            <p className="text-sm text-red-500">{errors.city}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            value={values.state}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.state && errors.state ? "border-red-500" : ""}
          />
          {touched.state && errors.state && (
            // @ts-ignore
            <p className="text-sm text-red-500">{errors.state}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pincode">Pin Code</Label>
          <Input
            id="pincode"
            name="pincode"
            value={values.pincode}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              touched.pincode && errors.pincode ? "border-red-500" : ""
            }
          />
          {touched.pincode && errors.pincode && (
            // @ts-ignore
            <p className="text-sm text-red-500">{errors.pincode}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={values.country}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              touched.country && errors.country ? "border-red-500" : ""
            }
          />
          {touched.country && errors.country && (
            // @ts-ignore
            <p className="text-sm text-red-500">{errors.country}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <Select
          name="addressType"
          onValueChange={(value) => setFieldValue("addressType", value)}
          value={values.addressType}
          defaultValue="Residential"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Address Type" />
          </SelectTrigger>
          <SelectContent>
            {addressTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </form>
  );
};

const AddressSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between space-x-4"
        >
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      ))}
    </div>
  );
};

const AddressTab = () => {
  const [addresses, setAddresses] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [isEdit, setIsEdit] = useState<any>(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [addressId, setAddressId] = useState(null);

  const handleDeleteAddress = (id) => {
    setAddressId(id);
    setIsDeleteModal(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
    setIsEdit(true);
  };

  const {
    mutate: deleteMutate,
    isPending: isDeletePending,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    error: deleteError,
  } = useAddressDeleteAPI();

  useEffect(() => {
    if (isDeleteError) {
      toast({
        variant: "destructive",
        // @ts-ignore
        title: deleteError.response?.data.message,
      });
    }

    if (isDeleteSuccess) {
      toast({
        variant: "success",
        title: "Address Deleted Successfully",
      });
    }
  }, [isDeleteError, isDeleteSuccess]);

  const handleDeleteSubmit = () => {
    deleteMutate(addressId);
  };

  const {
    data: ADDRESSES,
    isLoading: isAddressLoading,
    isSuccess: isAddressSuccess,
  } = useListAddress();

  return (
    <TabsContent value="address" className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Addresses</CardTitle>
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setEditingAddress(null);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Address
          </Button>
        </CardHeader>
        <CardContent>
          {isAddressLoading ? (
            <AddressSkeleton />
          ) : ADDRESSES?.data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address Type</TableHead>
                  <TableHead>Pin Code</TableHead>
                  <TableHead>Street</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ADDRESSES?.data.map((address) => (
                  <TableRow key={address.id}>
                    <TableCell className="font-medium">
                      {address.addressType}
                    </TableCell>
                    <TableCell>{address.pincode}</TableCell>
                    <TableCell>{address.streetAddress}</TableCell>
                    <TableCell>{address.city}</TableCell>
                    <TableCell>{address.state}</TableCell>
                    <TableCell>{address.country}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          handleEditAddress(address);
                          setIsEdit(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500"
                        onClick={() => handleDeleteAddress(address.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div
              className={`flex flex-1 items-center h-[80vh] justify-center rounded-lg border border-dashed shadow-sm mt-3 `}
              x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  No Address found.!
                </h3>
                <p className="text-sm text-muted-foreground">Add Address</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? "Edit Address" : "Add New Address"}
            </DialogTitle>
          </DialogHeader>
          <AddressForm
            initialValues={editingAddress}
            modalAction={setIsModalOpen}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteModal} onOpenChange={setIsDeleteModal}>
        {isDeletePending && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteModal(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSubmit}
              className="bg-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TabsContent>
  );
};

export default AddressTab;
