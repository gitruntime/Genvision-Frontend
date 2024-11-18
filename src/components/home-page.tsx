import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  // @ts-ignore
  const [open, setOpen] = useState(false);

  // @ts-ignore
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const onUserRoleSelect = (role: string) => {
    switch (role) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      default:
        navigate("/admin/dashboard");
        break;
    }
  };

  const handleUserRoleClick = (
    role: "admin" | "teacher" | "student" | "parent"
  ) => {
    onUserRoleSelect(role);
    handleClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="bg-white p-6 rounded-md shadow-lg w-full max-w-md"
        aria-modal="true"
        role="dialog"
      >
        <h2 className="text-2xl font-bold mb-4">Select User Role</h2>
        <p className="mb-4">Please choose your user role to proceed:</p>
        <div className="flex flex-col space-y-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            onClick={() => handleUserRoleClick("admin")}
          >
            Admin
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            onClick={() => handleUserRoleClick("teacher")}
          >
            Teacher
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            onClick={() => handleUserRoleClick("student")}
          >
            Student
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            onClick={() => handleUserRoleClick("parent")}
          >
            Parent
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
