import {
  useGetStudentsFromClass,
} from "../store/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";

const TeacherAddListSkeleton = () => {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="border-b">
          <th className="text-left p-4 font-medium">
            <Skeleton className="w-24 h-6" />
          </th>
          <th className="text-left p-4 font-medium">
            <Skeleton className="w-16 h-6" />
          </th>
          <th className="text-left p-4 font-medium">
            <Skeleton className="w-32 h-6" />
          </th>
        </tr>
      </thead>
      <tbody>
        {Array(5) // Simulate 5 rows as loading
          .fill(0)
          .map((_, index) => (
            <tr key={index} className="border-b">
              <td className="p-4">
                <Skeleton className="w-1/2 h-6" />
              </td>
              <td className="p-4">
                <Skeleton className="w-1/4 h-6" />
              </td>
              <td className="p-4">
                <div className="flex space-x-2">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-8 h-8 rounded-full" />
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

const StudentAddList = ({ classId }: any) => {

  const {
    data: STUDENT_LIST,
    isLoading: STUDENT_LISTLOADING,
  } = useGetStudentsFromClass(classId);
  return (
    <DialogContent className="max-w-[50%] max-h-[95%] overflow-y-scroll hide-sidebar">
      <DialogHeader>Class Participants</DialogHeader>
      <div className="flex">
        <div className="flex-1 overflow-y-scroll max-h-[500px] hide-scrollbar">
          {STUDENT_LISTLOADING ? (
            <TeacherAddListSkeleton />
          ) : STUDENT_LIST?.data && STUDENT_LIST?.data.length > 0 ? (
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium"></th>
                  <th className="text-left p-4 font-medium">Student Name</th>
                  <th className="text-left p-4 font-medium"></th>
                  <th className="text-left p-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {STUDENT_LIST?.data.map((student: any) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      {student.studentProfile.profilePicture}
                    </td>
                    <td className="p-4">{student.fullName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // If no subjects, display a message
            <div className="p-4 text-center text-sm text-gray-500">
              No students available
            </div>
          )}
        </div>
      </div>
    </DialogContent>
  );
};

export default StudentAddList;
