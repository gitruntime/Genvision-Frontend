import React from "react";

export function Account() {
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
            <h1 className="text-2xl font-semibold">Jason Sharlton</h1>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500">★★★★</span>
              <span className="text-gray-400">★</span>
            </div>
            <p className="text-sm text-gray-500">
              3.1 average based on 6 reviews.
            </p>
          </div>

          {/* General Details */}
          <div className="flex-1 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Staff ID:</strong> 90006
              </div>
              <div>
                <strong>Role:</strong> Teacher
              </div>
              <div>
                <strong>Designation:</strong> Faculty
              </div>
              <div>
                <strong>Department:</strong> Academic
              </div>
              <div>
                <strong>EPF No:</strong> 1596324
              </div>
              <div>
                <strong>Basic Salary:</strong> 80,000.00
              </div>
              <div>
                <strong>Contract Type:</strong> Permanent
              </div>
              <div>
                <strong>Work Shift:</strong> Morning
              </div>
              <div>
                <strong>Work Location:</strong> Ground Floor
              </div>
              <div>
                <strong>Date of Joining:</strong> 06/24/2018
              </div>
              <div>
                <strong>Barcode:</strong> 90866
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Details */}
        <div className="w-full mt-4 border-t">
          <ul className="flex space-x-4 p-4">
            <li className="border-b-2 border-orange-500 pb-2">Profile</li>
            <li>Payroll</li>
            <li>Leaves</li>
            <li>Attendance</li>
            <li>Documents</li>
          </ul>
        </div>

        {/* Profile Details */}
        <div className="w-full p-4 grid grid-cols-2 gap-6">
          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
            <p>
              <strong>Phone:</strong> 46546654564
            </p>
            <p>
              <strong>Emergency Contact:</strong> 5456121565
            </p>
            <p>
              <strong>Email:</strong> jason@gmail.com
            </p>
            <p>
              <strong>Gender:</strong> Male
            </p>
            <p>
              <strong>Date of Birth:</strong> 06/16/1980
            </p>
            <p>
              <strong>Marital Status:</strong> Married
            </p>
            <p>
              <strong>Father's Name:</strong> Max Sharlton
            </p>
            <p>
              <strong>Mother's Name:</strong> Arya Sharlton
            </p>
            <p>
              <strong>Qualification:</strong> B.Ed.
            </p>
            <p>
              <strong>Work Experience:</strong> 3 Yrs
            </p>
            <p>
              <strong>Note:</strong> No additional notes
            </p>
            <p>
              <strong>PAN Number:</strong> UIYEG5809L
            </p>
          </div>

          {/* Address and Bank Details */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Address Details</h2>
            <p>
              <strong>Current Address:</strong> 83 Evan Street Brooklyn
            </p>
            <p>
              <strong>Permanent Address:</strong> 83 Evan Street Brooklyn
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
      </div>
    </>
  );
}
