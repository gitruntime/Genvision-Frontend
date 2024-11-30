import api from "@/modules/admins/utils/axios-util";

export const AttendanceList = async () => {
  const response = await api.get(`/student/classes/attendances`);
  return response.data;
};

export const TeacherList = async () => {
  const response = await api.get(`/student/classes/teachers`);
  return response.data;
};

export const ClassmatesList = async () => {
  const response = await api.get(`/student/classes/classmates`);
  return response.data;
};

export const MarksList = async () => {
  const response = await api.get(`/student/classes/marks`);
  return response.data;
};
