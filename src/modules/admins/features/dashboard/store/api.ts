import api from "@/modules/admins/utils/axios-util";

export const DashboardAPI = async () => {
  const response = await api.get(`/admin/account/dashboard`);
  return response.data;
};
