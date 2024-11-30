import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  AddressCreateAPI,
  AddressDeleteAPI,
  AddressListAPI,
  AddressUpdateAPI,
  DashboardAPI,
  GoalCreateAPI,
  GoalDeleteAPI,
  GoalListAPI,
  GoalUpdateAPI,
  InterestCreateAPI,
  InterestDeleteAPI,
  InterestListAPI,
  ProfileUpdateAPI,
  ProfileViewAPI,
  VolunteerCreateAPI,
  VolunteerDeleteAPI,
  VolunteerListAPI,
  VolunteerUpdateAPI,
} from "./api";
import { AxiosError } from "axios";

export const useProfileViewAPI = (): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: ProfileViewAPI,
  });
};

export const useProfileUpdateAPI = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (data) => ProfileUpdateAPI(data),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["profile"]);
    },
    retry: false,
  });
};

export const useListAddress = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: AddressListAPI,
  });
};

export const useAddressCreateAPI = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (data) => AddressCreateAPI(data),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["addresses"]);
    },
    retry: false,
  });
};

export const useAddressUpdateAPI = (id:any) => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (data) => AddressUpdateAPI(id, data),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["profile", id]);
    },
    retry: false,
  });
};

export const useAddressDeleteAPI = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (id) => AddressDeleteAPI(id),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["addresses"]);
    },
  });
};

export const useListGoals = () => {
  return useQuery({
    queryKey: ["goals"],
    queryFn: GoalListAPI,
  });
};

export const useGoalCreateAPI = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (data) => GoalCreateAPI(data),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["goals"]);
    },
    retry: false,
  });
};

export const useGoalUpdateAPI = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: ([id, data]) => GoalUpdateAPI(id, data),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["goal", id]);
    },
    retry: false,
  });
};

export const useGoalDeleteAPI = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (id) => GoalDeleteAPI(id),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["goals"]);
    },
  });
};

export const useListInterests = () => {
  return useQuery({
    queryKey: ["interests"],
    queryFn: InterestListAPI,
  });
};

export const useInterestsCreateAPI = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (data) => InterestCreateAPI(data),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["interests"]);
    },
    retry: false,
  });
};

export const useInterestsDeleteAPI = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (data) => InterestDeleteAPI(data),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["interests"]);
    },
    retry: false,
  });
};

export const useListVolunteer = () => {
  return useQuery({
    queryKey: ["volunteers"],
    queryFn: VolunteerListAPI,
  });
};

export const useVolunteerCreate = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (data) => VolunteerCreateAPI(data),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["volunteers"]);
    },
    retry: false,
  });
};

export const useVolunteerUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: ([id, data]) => VolunteerUpdateAPI(id, data),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["volunteers"]);
    },
    retry: false,
  });
};

export const useVolunteerDelete = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (id) => VolunteerDeleteAPI(id),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["volunteers"]);
    },
  });
};

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: DashboardAPI,
  });
};
