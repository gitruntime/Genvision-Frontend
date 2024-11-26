import api from "@/modules/admins/utils/axios-util";

export const ProfileViewAPI = async () => {
  const response = await api.get(`/student/profile`);
  return response.data;
};

export const ProfileUpdateAPI = async (data: any) => {
  const response = await api.put(`/student/profile`, data);
  return response.data;
};

export const AddressListAPI = async () => {
  const response = await api.get(`/student/addresses`);
  return response.data;
};

export const AddressCreateAPI = async (data) => {
  const response = await api.post(`/student/addresses`, data);
  return response.data;
};

export const AddressUpdateAPI = async (id, data) => {
  const response = await api.put(`/student/addresses/${id}`, data);
  return response.data;
};

export const AddressDeleteAPI = async (id) => {
  const response = await api.delete(`/student/addresses/${id}`);
  return response.data;
};

export const GoalListAPI = async () => {
  const response = await api.get(`/student/goals`);
  return response.data;
};

export const GoalCreateAPI = async (data) => {
  const response = await api.post(`/student/goals`, data);
  return response.data;
};

export const GoalUpdateAPI = async (id, data) => {
  const response = await api.put(`/student/goals/${id}`, data);
  return response.data;
};

export const GoalDeleteAPI = async (id) => {
  const response = await api.delete(`/student/goals/${id}`);
  return response.data;
};

export const InterestListAPI = async () => {
  const response = await api.get(`/student/interests`);
  return response.data;
};

export const InterestCreateAPI = async (data) => {
  const response = await api.post(`/student/interests`, data);
  return response.data;
};

export const InterestDeleteAPI = async (data) => {
  const response = await api.post(`/student/interests/delete`, data);
  return response.data;
};

export const VolunteerListAPI = async () => {
  const response = await api.get(`/student/volunteers`);
  return response.data;
};

export const VolunteerCreateAPI = async (data) => {
  const response = await api.post(`/student/volunteers`, data);
  return response.data;
};

export const VolunteerUpdateAPI = async (id, data) => {
  const response = await api.put(`/student/volunteers/${id}`, data);
  return response.data;
};

export const VolunteerDeleteAPI = async (id) => {
  const response = await api.delete(`/student/volunteers/${id}`);
  return response.data;
};
