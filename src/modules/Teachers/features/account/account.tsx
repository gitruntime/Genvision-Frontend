import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../../apiConfig/Interceptor";
import { Modal } from "./Modal";
import { useForm } from "react-hook-form";


export function Account() {
  const [userDetails, setUserDetails] = useState<any>({});
  const [addressDetails, setAddressDetails] = useState<any>({});
  const [educationDetails, setEducationDetails] = useState<any>();
  const [experienceDetails, setExperienceDetails] = useState<any>();
  const [activeTab, setActiveTab] = useState("Profile");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educationToEdit, setEducationToEdit] = useState<any>(null);
  const [experienceToEdit, setExperienceToEdit] = useState<any>(null);
  const [experienceToDelete, setExperienceToDelete] = useState<any>(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [educationToDelete, setEducationToDelete] = useState<any>(null);
  const [actionType, setActionType] = useState<"add" | "edit">("add");

  const handleOpenModal = (type: "add" | "edit", dataToEdit?: any) => {
    setActionType(type);
    if (type === "edit" && dataToEdit) {
      if (activeTab === "Education") {
        const { id, name, fieldOfStudy, startDate, endDate, description } = dataToEdit;
        reset({
          name,
          fieldOfStudy,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          description,
        });
        setEducationToEdit({
          id,
          name,
          fieldOfStudy,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          description,
        });
      } else if (activeTab === "Experience") {
        const { id, department, designation, dateJoined } = dataToEdit;
        reset({
          department,
          designation,
          dateJoined: formatDate(dateJoined),
        });
        setExperienceToEdit({
          id,
          department,
          designation,
          dateJoined: formatDate(dateJoined),
        });
      }
    } else {
      reset({
        name: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        description: "",
        department: "",
        designation: "",
        dateJoined: "",
      });
      setEducationToEdit(null);
      setExperienceToEdit(null);
    }
    setIsModalOpen(true);
  };


  const handleCloseModal = () => setIsModalOpen(false);

  // Helper function to format the date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Modified `handleOpenDeleteModal` function
  const handleOpenDeleteModal = (item: any) => {
    if (activeTab === "Education") {
      setEducationToDelete(item);
    } else if (activeTab === "Experience") {
      setExperienceToDelete(item);
    }
    setShowDeleteConfirm(true);
  };

  const handleCloseDeleteModal = () => {
    setEducationToDelete(null);
    setShowDeleteConfirm(false);
  };
  // New `handleDelete` function to handle deletion based on the active tab
  const handleDelete = async () => {
    try {
      if (activeTab === "Education" && educationToDelete) {
        await api.delete(`/teacher/educations/${educationToDelete.id}`);
        setEducationDetails((prev: any) => prev.filter((ed: any) => ed.id !== educationToDelete.id));
        setEducationToDelete(null);
      } else if (activeTab === "Experience" && experienceToDelete) {
        await api.delete(`/teacher/experiences/${experienceToDelete.id}`);
        setExperienceDetails((prev: any) => prev.filter((exp: any) => exp.id !== experienceToDelete.id));
        setExperienceToDelete(null);
      }
      setShowDeleteConfirm(false);
      console.log("Item deleted successfully.");
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const tabs = ["Profile", "Education", "Experience", "Attendance", "Documents"];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      description: "",
      department: "",
      designation: "",
      dateJoined: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      let requestData;
  
      if (activeTab === "Education") {
        requestData = {
          name:data.name,
          startDate:data.startDate,
          endDate:data.endDate,
          description:data.description,
          fieldOfStudy:data.fieldOfStudy

          
          // add other education-specific fields here
        };
  
        if (actionType === "edit" && educationToEdit) {
          await api.put(`/teacher/educations/${educationToEdit.id}`, requestData);
        } else {
          await api.post("/teacher/educations", requestData);
        }
        fetchEducationDetails();
        
      } else if (activeTab === "Experience") {
        requestData = {
          department:data.department,
          designation:data.designation,
          dateJoined:data.dateJoined
          
          // add other experience-specific fields here
        };
  
        if (actionType === "edit" && experienceToEdit) {
          await api.put(`/teacher/experiences/${experienceToEdit.id}`, requestData);
        } else {
          await api.post("/teacher/experiences", requestData);
        }
        fetchExperienceDetails();
      }
  
      reset();
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Failed to ${actionType} ${activeTab.toLowerCase()}:`, error);
    }
  };
  

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get("/teacher");
        setUserDetails(response.data?.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchAddressDetails = async () => {
      try {
        const response = await api.get("/teacher/addresses");
        setAddressDetails(response.data?.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchAddressDetails();
  }, []);

  const fetchEducationDetails = async () => {
    try {
      const response = await api.get("/teacher/educations");
      setEducationDetails(response.data?.data);
    } catch (error) {
      console.error("Failed to fetch education details:", error);
    }
  };

  

  const fetchExperienceDetails = async () => {
    try {
      const response = await api.get("/teacher/experiences");
      console.log("experience", response?.data?.data)
      setExperienceDetails(response?.data?.data);
    } catch (error) {
      console.error("Failed to fetch experience details:", error);
    }
  };

  useEffect(() => {
    fetchEducationDetails();
    fetchExperienceDetails();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center w-full mx-auto p-4 bg-white shadow-lg rounded-lg">
        <div className="flex w-full">
          {/* Profile Picture and Basic Info */}
          <div className="flex flex-col items-center w-1/3 p-4 border-r">
            <img
              src="https://media.licdn.com/dms/image/v2/C4E03AQGlV9KrEWdyDA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1562249793821?e=1735776000&v=beta&t=uVqLQRqeOjADMlgPrr4CkhvuZQteYGk90Ahmkh8Oufs"
              alt="Teacher Profile"
              className="w-32 h-32 rounded-full mb-4"
            />
            <h1 className="text-2xl font-semibold">{userDetails.fullName}</h1>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500">★★★★</span>
              <span className="text-gray-400">★</span>
            </div>
            <p className="text-sm text-gray-500">3.1 average based on 6 reviews.</p>
          </div>

          {/* General Details */}
          <div className="flex-1 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Staff Name:</strong> {userDetails?.fullName}
              </div>
              <div>
                <strong>Role:</strong> {userDetails?.userRole}
              </div>
              <div>
                <strong>D.O.B:</strong> {userDetails?.dateOfBirth}
              </div>
              <div>
                <strong>Contact:</strong> {userDetails?.phoneNumber}
              </div>
              <div>
                <strong>Blood Group:</strong> {userDetails?.teacherProfile?.bloodGroup}
              </div>
              <div>
                <strong>Email:</strong> {userDetails?.email}
              </div>
              <div>
                <strong>Bio:</strong> {userDetails?.teacherProfile?.bio}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Tabs for Details */}
        <div className="w-full mt-4 border-t">
          <ul className="flex space-x-4 p-4">
            {tabs.map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 cursor-pointer ${activeTab === tab ? "border-b-2 border-orange-500" : ""
                  }`}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic Content Section */}
        <div className="w-full p-4">
          {activeTab === "Profile" && (
            <div className="w-full p-4 grid grid-cols-2 gap-6">
              {/* Profile Details */}
              {/* Contact Information */}
          

              {/* Address and Bank Details */}
              {/* Address and Bank Details */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Address Details</h2>
                <p>
                  <strong>{addressDetails?.[1]?.addressType} Address: </strong>
                  {addressDetails?.[1]?.streetAddress},
                  {addressDetails?.[1]?.city},
                  {addressDetails?.[1]?.state},
                  {addressDetails?.[1]?.pincode},
                  {addressDetails?.[1]?.country}

                </p>
                <p >
                  <strong>{addressDetails?.[0]?.addressType} Address: </strong>

                  {addressDetails?.[0]?.streetAddress},
                  {addressDetails?.[0]?.city},
                  {addressDetails?.[0]?.state},
                  {addressDetails?.[0]?.pincode},
                  {addressDetails?.[0]?.country}

                </p>
                <h2 className="text-lg font-semibold mt-4 mb-2">
                  Bank Account Details
                </h2>
                <p>
                  <strong>Account Title:</strong> Jason Sharlton
                </p>
                <p>
                  <strong>Bank Name:</strong> XYZ Bank
                </p>
              </div>
            </div>
          )}
          {/* Education Tab */}
          {activeTab === "Education" && (
            <div>
              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-semibold">Education Details</h2>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleOpenModal("add")}
                >
                  Add Education
                </button>
              </div>
              {/* List Education Details */}
              {educationDetails &&
                educationDetails.map((education: any) => (
                  <div key={education.id} className="flex justify-between items-center p-4 border-b">
                    <div>
                      <p>
                        <strong>School Name:</strong> {education.name}
                      </p>
                      <p>
                        <strong>Field of Study:</strong> {education.fieldOfStudy}
                      </p>
                      <p>
                        <strong>Start Date:</strong> {formatDate(education.startDate)}
                      </p>
                      <p>
                        <strong>End Date:</strong> {formatDate(education.endDate)}
                      </p>
                      <p>
                        <strong>Description:</strong> {education.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
                        onClick={() => handleOpenModal("edit", education)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                        onClick={() => handleOpenDeleteModal(education)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              {/* Confirm Delete Modal */}
              {showDeleteConfirm && (
                <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
                  <p>Are you sure you want to delete this {activeTab.toLowerCase()}?</p>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded ml-2"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </button>
                </Modal>
              )}
            </div>
          )}
          {/*  experience Tab */}
          {activeTab === "Experience" && (
            <div>
              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-semibold">Experience Details</h2>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleOpenModal("add")}
                >
                  Add Experience
                </button>
              </div>
              {/* List Experience Details */}
              {experienceDetails &&
                experienceDetails.map((experience: any) => (
                  <div key={experience.id} className="flex justify-between items-center p-4 border-b">
                    <div>
                      <p>
                        <strong>Department:</strong> {experience.department}
                      </p>
                      <p>
                        <strong>Designation:</strong> {experience.designation}
                      </p>

                      <p>
                        <strong>DateJoined:</strong> {experience.dateJoined}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
                        onClick={() => handleOpenModal("edit", experience)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                        onClick={() => handleOpenDeleteModal(experience)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              {/* Confirm Delete Modal */}
              {showDeleteConfirm && (
                <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
                  <p>Are you sure you want to delete this {activeTab.toLowerCase()}?</p>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded ml-2"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </button>
                </Modal>
              )}
            </div>
          )}
          {activeTab === "Attendance" && <div>Attendance information goes here.</div>}
          {activeTab === "Documents" && <div>Documents information goes here.</div>}
        </div>
      </div>

      {/* Modal for Add/Edit Education */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          {activeTab==="Education" &&(
            <h2 className="text-lg font-semibold mb-4">
            {actionType === "edit" ? "Edit Education" : "Add Education"}
          </h2>
          )}
          {activeTab==="Experience" &&(
            <h2 className="text-lg font-semibold mb-4">
            {actionType === "edit" ? "Edit Experience" : "Add Experience"}
          </h2>
          )}


          {activeTab === "Education" && (
            <>
              <div className="mb-4">
                <label className="block font-semibold">School Name:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  {...register("name", { required: "School name is required" })}
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block font-semibold">Field of Study:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  {...register("fieldOfStudy", { required: "Field of study is required" })}
                />
                {errors.fieldOfStudy && <p className="text-red-500">{errors.fieldOfStudy.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block font-semibold">Start Date:</label>
                <input
                  type="date"
                  className="w-full border rounded p-2"
                  {...register("startDate", { required: "Start date is required" })}
                />
                {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block font-semibold">End Date:</label>
                <input
                  type="date"
                  className="w-full border rounded p-2"
                  {...register("endDate", { required: "End date is required" })}
                />
                {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block font-semibold">Description:</label>
                <textarea
                  className="w-full border rounded p-2"
                  {...register("description")}
                ></textarea>
              </div>


            </>
          )}

          {activeTab === "Experience" && (
            <>
              <div className="mb-4">
                <label className="block font-semibold">Department:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  {...register("department", { required: "Department name is required" })}
                />
                {errors.department && <p className="text-red-500">{errors.department.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block font-semibold">Designation:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  {...register("designation", { required: "Field of Designation is required" })}
                />
                {errors.designation && <p className="text-red-500">{errors.designation.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block font-semibold">Date Joined:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  {...register("dateJoined", { required: "Field of Date Joined is required" })}
                />
                {errors.dateJoined && <p className="text-red-500">{errors.dateJoined.message}</p>}
              </div>
            </>
          )}


          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {actionType === "edit" ? "Update" : "Add"}
          </button>
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={handleCloseModal}
          >
            Cancel
          </button>

        </form>
      </Modal>
    </>
  );
} 