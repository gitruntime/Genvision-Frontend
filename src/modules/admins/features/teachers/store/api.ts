import api from "@/modules/admins/utils/axios-util";
import { FetchDataParams, Teacher } from "../types";
import { UseQueryResult } from "@tanstack/react-query";

export type id = string | number | null;



interface PaginatedTeacherData {
  data: Teacher[];
  total: number;
}

export const teacherListAPI = async ({
  page,
  size,
  sortBy,
  sortOrder,
}: FetchDataParams): Promise<PaginatedTeacherData> => {
  const response = await api.get(`/admin/teachers`, {
    params: { page, size, sortBy, sortOrder },
  });
  return response.data;
};
export const teacherCreateAPI = async (data: any) => {
  const response = await api.post(`/admin/teachers`, data);
  return response.data;
};

export const teacherViewAPI = async (id: id) => {
  const response = await api.get(`/admin/teachers/${id}`);
  return response.data?.data;
};

export const teacherUpdateAPI = async (id: id, data: any) => {
  const response = await api.put(`/admin/teachers/${id}`, data);
  return response.data;
};

export const teacherDeleteAPI = async (id: id) => {
  const response = await api.delete(`/admin/teachers/${id}`);
  return response.data;
};

export const addressListAPI = async (
  teacherId: number | string
): Promise<any> => {
  const response = await api.get(`/admin/teachers/${teacherId}/addresses`);
  return response.data?.data;
};

export const educationListAPI = async (
  teacherId: number | string
): Promise<any> => {
  const response = await api.get(`/admin/teachers/${teacherId}/educations`);
  return response.data;
};

export const experienceListAPI = async (
  teacherId: number | string
): Promise<any> => {
  const response = await api.get(`/admin/teachers/${teacherId}/experiences`);
  return response.data;
};
