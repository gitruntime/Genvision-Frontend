import api from "@/modules/admins/utils/axios-util";
import { FetchDataParams } from "../../teachers/types";

export type id = string | number;

export const StudentListAPI = async ({
  page,
  size,
  sortBy,
  sortOrder,
}: FetchDataParams): Promise<any> => {
  const response = await api.get(`/admin/students`, {
    params: { page, size, sortBy, sortOrder },
  });
  return response.data;
};
export const studentCreateAPI = async (data: any) => {
  const response = await api.post(`/admin/students`, data);
  return response.data;
};

export const studentViewAPI = async (id: id) => {
  const response = await api.get(`/admin/students/${id}`);
  return response.data;
};

export const studentUpdateAPI = async (id: id, data: any) => {
  const response = await api.put(`/admin/students/${id}`, data);
  return response.data;
};

export const studentDeleteAPI = async (id: id) => {
  const response = await api.delete(`/admin/students/${id}`);
  return response.data;
};

export const SAddressListAPI = async (studentId: id) => {
  const response = await api.get(`/admin/students/${studentId}/addresses`);
  return response.data;
};

export const addressCreateAPI = async (studentId: id, data: any) => {
  const response = await api.get(
    `/admin/students/${studentId}/addresses`,
    data
  );
  return response.data;
};

export const addressViewAPI = async (studentId: id, id: id) => {
  const response = await api.get(
    `/admin/students/${studentId}/addresses/${id}`
  );
  return response.data;
};

export const addressUpdateAPI = async (studentId: id, id: id, data: any) => {
  const response = await api.get(
    `/admin/students/${studentId}/addresses/${id}`,
    data
  );
  return response.data;
};

export const addressDeleteAPI = async (studentId: id, id: id) => {
  const response = await api.get(
    `/admin/students/${studentId}/addresses/${id}`
  );
  return response.data;
};

export const SAttendanceListAPI = async (studentId: id) => {
  const response = await api.get(`/admin/students/${studentId}/attendances`);
  return response.data;
};

export const attendanceCreateAPI = async (studentId: id, data: any) => {
  const response = await api.get(
    `/admin/students/${studentId}/attendances`,
    data
  );
  return response.data;
};

export const attendanceUpdateAPI = async (studentId: id, id: id, data: any) => {
  const response = await api.put(
    `/admin/students/${studentId}/attendances/${id}`,
    data
  );
  return response.data;
};

export const attendanceDeleteAPI = async (studentId: id, id: id) => {
  const response = await api.get(
    `/admin/students/${studentId}/attendances/${id}`
  );
  return response.data;
};

export const volunteerListAPI = async (studentId: id) => {
  const response = await api.get(`/admin/students/${studentId}/volunteers`);
  return response.data;
};

export const volunteerCreateAPI = async (studentId: id) => {
  const response = await api.get(`/admin/students/${studentId}/volunteers`);
  return response.data;
};

export const volunteerViewAPI = async (studentId: id, id: id) => {
  const response = await api.get(
    `/admin/students/${studentId}/volunteers/${id}`
  );
  return response.data;
};

export const volunteerUpdateAPI = async (studentId: id, id: id) => {
  const response = await api.get(
    `/admin/students/${studentId}/volunteers/${id}`
  );
  return response.data;
};

export const volunteerDeleteAPI = async (studentId: id, id: id) => {
  const response = await api.get(
    `/admin/students/${studentId}/volunteers/${id}`
  );
  return response.data;
};

export const markListAPI = async (studentId: id) => {
  const response = await api.get(`/admin/students/${studentId}/attendance`);
  return response.data;
};

export const markCreateAPI = async (studentId: id) => {
  const response = await api.get(`/admin/students/${studentId}/attendance`);
  return response.data;
};

export const markViewAPI = async (studentId: id, id: id) => {
  const response = await api.get(
    `/admin/students/${studentId}/attendance/${id}`
  );
  return response.data;
};

export const markUpdateAPI = async (studentId: id, id: id) => {
  const response = await api.get(
    `/admin/students/${studentId}/attendance/${id}`
  );
  return response.data;
};

export const markDeleteAPI = async (studentId: id, id: id) => {
  const response = await api.get(
    `/admin/students/${studentId}/attendance/${id}`
  );
  return response.data;
};

export const medicalRecordListAPI = async (studentId: id) => {
  const response = await api.get(`/admin/students/${studentId}/attendance`);
  return response.data;
};

export const medicalRecordCreateAPI = async (studentId: id) => {
  const response = await api.get(`/admin/students/${studentId}/attendance`);
  return response.data;
};

export const medicalRecordViewAPI = async (studentId: id, id: id) => {
  const response = await api.get(
    `/admin/students/${studentId}/attendance/${id}`
  );
  return response.data;
};

export const medicalRecordUpdateAPI = async (studentId: id, id: id) => {
  const response = await api.get(
    `/admin/students/${studentId}/attendance/${id}`
  );
  return response.data;
};

export const medicalRecordDeleteAPI = async (studentId: id, id: id) => {
  const response = await api.get(
    `/admin/students/${studentId}/attendance/${id}`
  );
  return response.data;
};

export const awardListAPI = async (studentId: id) => {
  const response = await api.get(`/admin/students/${studentId}/attendance`);
  return response.data;
};

export const awardCreateAPI = async (studentId: id, data: any) => {
  const response = await api.get(
    `/admin/students/${studentId}/attendance`,
    data
  );
  return response.data;
};

export const awardViewAPI = async (studentId: id, id: id) => {
  const response = await api.get(
    `/admin/students/${studentId}/attendance/${id}`
  );
  return response.data;
};

export const awardUpdateAPI = async (studentId: id, id: id, data: any) => {
  const response = await api.get(
    `/admin/students/${studentId}/attendance/${id}`,
    data
  );
  return response.data;
};

export const awardDeleteAPI = async (studentId: id, id: id) => {
  const response = await api.get(
    `/admin/students/${studentId}/attendance/${id}`
  );
  return response.data;
};

export const documentListAPI = async (studentId: id) => {
  const response = await api.get(`/admin/students/${studentId}/attendance`);
  return response.data;
};

export const documentCreateAPI = async (studentId: id) => {
  const response = await api.get(`/admin/students/${studentId}/attendance`);
  return response.data;
};

export const documentViewAPI = async (studentId: id, id: id) => {
  const response = await api.get(
    `/admin/students/${studentId}/attendance/${id}`
  );
  return response.data;
};

export const documentUpdateAPI = async (studentId: id, id: id) => {
  const response = await api.get(
    `/admin/students/${studentId}/attendance/${id}`
  );
  return response.data;
};

export const documentDeleteAPI = async (studentId: id, id: id) => {
  const response = await api.get(
    `/admin/students/${studentId}/attendance/${id}`
  );
  return response.data;
};

export const MarkListAPI = async (id:any) => {
  const response = await api.get(`/admin/students/${id}/marks`);
  return response.data;
};

export const MarkCreateAPI = async (id:any, data:any) => {
  const response = await api.post(`/admin/students/${id}/marks`, data);
  return response.data;
};

export const InterestListAPI = async (id:any) => {
  const response = await api.get(`/admin/students/${id}/interests`);
  return response.data;
};

export const AIPromptAPI = async (id:any) => {
  const response = await api.get(`/admin/students/${id}/ai`);
  return response.data;
};
