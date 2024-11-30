import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DashboardAPI } from "./api";

export const useDashboard = (): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: DashboardAPI,
  });
};
