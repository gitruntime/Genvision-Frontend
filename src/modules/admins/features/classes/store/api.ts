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
