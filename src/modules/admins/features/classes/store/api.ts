import api from "@/modules/admins/utils/axios-util";
import { FetchDataParams } from "../../teachers/types";

export const ClassListAPI = async ({
  page,
  size,
  sortBy,
  sortOrder,
}: FetchDataParams): Promise<any> => {
  const response = await api.get(`/admin/classes`, {
    params: { page, size, sortBy, sortOrder },
  });
  return response.data;
};

export const ClassCreateAPI = async (data: any) => {
  const response = await api.post(`/admin/classes`, data);
  return response.data;
};

export const ClassUpdateAPI = async (id: number | string, data: any) => {
  const response = await api.put(`/admin/classes/${id}`, data);
  return response.data;
};

export const ClassDeleteAPI = async (id: number | string) => {
  const response = await api.delete(`/admin/classes/${id}`);
  return response.data;
};

export const SubjectListAPI = async ({
  page,
  size,
  sortBy,
  sortOrder,
}: FetchDataParams): Promise<any> => {
  const response = await api.get(`/admin/subjects`, {
    params: { page, size, sortBy, sortOrder },
  });
  return response.data;
};

export const SubjectCreateAPI = async (data: any) => {
  const response = await api.post(`/admin/subjects`, data);
  return response.data;
};

export const SubjectUpdateAPI = async (id: number | string, data: any) => {
  const response = await api.put(`/admin/subjects/${id}`, data);
  return response.data;
};

export const SubjectDeleteAPI = async (id: number | string) => {
  const response = await api.delete(`/admin/subjects/${id}`);
  return response.data;
};

export const GetSubjectsFromClassAPI = async (id: number | string) => {
  const response = await api.get(`/admin/classes/${id}/subjects`);
  return response.data;
};

export const AddSubjectsToClassAPI = async (id: number | string, data: any) => {
  const response = await api.post(`/admin/classes/${id}/subjects`, data);
  return response.data;
};

export const GetTeachersFromClassAPI = async (id: number | string) => {
  const response = await api.get(`/admin/classes/${id}/teachers`);
  return response.data;
};

export const AddTeachersToClassAPI = async (id: number | string, data: any) => {
  const response = await api.post(`/admin/classes/${id}/teachers`, data);
  return response.data;
};

export const DeleteTeachersFromClassAPI = async (
  classId: number | string,
  id: number | string
) => {
  const response = await api.delete(`/admin/classes/${classId}/teachers/${id}`);
  return response.data;
};

export const GetStudentsFromClassAPI = async (id: number | string) => {
  const response = await api.get(`/admin/classes/${id}/students`);
  return response.data;
};

export const AddStudentsToClassAPI = async (id: number | string, data: any) => {
  const response = await api.post(`/admin/classes/${id}/students`, {
    studentIds: data,
  });
  return response.data;
};

export const AssignmentListAPI = async (id: number | string) => {
  const response = await api.get(`/admin/classes/${id}/assignments`);
  return response.data;
};

export const AssignmentCreateAPI = async (id: number | string) => {
  const response = await api.post(`/admin/classes/${id}/assignments`);
  return response.data;
};

export const ExamCreateAPI = async (data: any) => {
  const response = await api.post("/admin/exams", data);
  return response.data;
};

export const ExamListAPI = async (params: { studentId?: number }) => {
  const response = await api.get("/admin/exams", { params });
  return response.data;
};

export const GetSubjectDataUsingClass = async (id) => {
  const response = await api.get(`/admin/classes/${id}/subjectsData`);
  return response.data;
};
