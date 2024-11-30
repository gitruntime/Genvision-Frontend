import { useQuery } from "@tanstack/react-query";
import { AttendanceList, ClassmatesList, MarksList, TeacherList } from "./api";

export const useListAttendance = () => {
  return useQuery({
    queryKey: ["attendances"],
    queryFn: AttendanceList,
  });
};

export const useListTeacher = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: TeacherList,
  });
};
export const useListClassmates = () => {
  return useQuery({
    queryKey: ["classmates"],
    queryFn: ClassmatesList,
  });
};
export const useListMarks = () => {
  return useQuery({
    queryKey: ["marks"],
    queryFn: MarksList,
  });
};
