// Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 z-10 w-full max-w-md mx-4">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

// {activeTab === "Education" && (
//   <>
//     <div className="mb-4">
//       <label className="block font-semibold">School Name:</label>
//       <input
//         type="text"
//         className="w-full border rounded p-2"
//         {...register("name", { required: "School name is required" })}
//       />
//       {errors.name && <p className="text-red-500">{errors.name.message}</p>}
//     </div>

//     <div className="mb-4">
//       <label className="block font-semibold">Field of Study:</label>
//       <input
//         type="text"
//         className="w-full border rounded p-2"
//         {...register("fieldOfStudy", { required: "Field of study is required" })}
//       />
//       {errors.fieldOfStudy && <p className="text-red-500">{errors.fieldOfStudy.message}</p>}
//     </div>

//     <div className="mb-4">
//       <label className="block font-semibold">Start Date:</label>
//       <input
//         type="date"
//         className="w-full border rounded p-2"
//         {...register("startDate", { required: "Start date is required" })}
//       />
//       {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
//     </div>

//     <div className="mb-4">
//       <label className="block font-semibold">End Date:</label>
//       <input
//         type="date"
//         className="w-full border rounded p-2"
//         {...register("endDate", { required: "End date is required" })}
//       />
//       {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
//     </div>

//     <div className="mb-4">
//       <label className="block font-semibold">Description:</label>
//       <textarea
//         className="w-full border rounded p-2"
//         {...register("description")}
//       ></textarea>
//     </div>


//   </>
// )}

// {activeTab === "Experience" && (
//   <>
//     <div className="mb-4">
//       <label className="block font-semibold">Department:</label>
//       <input
//         type="text"
//         className="w-full border rounded p-2"
//         {...register("department", { required: "Department name is required" })}
//       />
//       {errors.department && <p className="text-red-500">{errors.department.message}</p>}
//     </div>

//     <div className="mb-4">
//       <label className="block font-semibold">Designation:</label>
//       <input
//         type="text"
//         className="w-full border rounded p-2"
//         {...register("designation", { required: "Field of Designation is required" })}
//       />
//       {errors.designation && <p className="text-red-500">{errors.designation.message}</p>}
//     </div>

//     <div className="mb-4">
//       <label className="block font-semibold">Date Joined:</label>
//       <input
//         type="text"
//         className="w-full border rounded p-2"
//         {...register("dateJoined", { required: "Field of Date Joined is required" })}
//       />
//       {errors.dateJoined && <p className="text-red-500">{errors.dateJoined.message}</p>}
//     </div>
//   </>
// )}
