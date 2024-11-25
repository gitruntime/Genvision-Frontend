import api from "@/modules/admins/utils/axios-util";

export const ProfileViewAPI = async () => {
  const response = await api.get(`/student/profile`);
  return response.data;
};

export const ProfileUpdateAPI = async (data: any) => {
  const response = await api.put(`/student/profile`, data);
  return response.data;
};
