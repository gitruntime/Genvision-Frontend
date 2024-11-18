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

export const ClassUpdateAPI = async (id : number | string, data: any) => {
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

export const SubjectUpdateAPI = async (id : number | string, data: any) => {
  const response = await api.put(`/admin/subjects/${id}`, data);
  return response.data;
};

export const SubjectDeleteAPI = async (id: number | string) => {
  const response = await api.delete(`/admin/subjects/${id}`);
  return response.data;
};
