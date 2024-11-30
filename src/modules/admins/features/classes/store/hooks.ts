import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { FetchDataParams } from "../../teachers/types";
import {
  AddSubjectsToClassAPI,
  AddTeachersToClassAPI,
  ClassCreateAPI,
  ClassDeleteAPI,
  ClassListAPI,
  ClassUpdateAPI,
  DeleteTeachersFromClassAPI,
  ExamCreateAPI,
  ExamListAPI,
  GetStudentsFromClassAPI,
  GetSubjectDataUsingClass,
  GetSubjectsFromClassAPI,
  GetTeachersFromClassAPI,
  SubjectCreateAPI,
  SubjectListAPI,
  SubjectUpdateAPI,
} from "./api";
import { AxiosError } from "axios";

export const useListClass = ({
  page,
  size,
  sortBy,
  sortOrder,
}: FetchDataParams): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "classes", page, size, sortBy, sortOrder],
    queryFn: () =>
      ClassListAPI({
        page,
        size,
        sortBy,
        sortOrder,
      }),
  });
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: ClassCreateAPI,
    retry: false,
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "classes"]);
    },
  });
};

export const useUpdateClass = (id: number | string) => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (data: any) => ClassUpdateAPI(id, data),
    retry: false,
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "classes"]);
    },
  });
};

export const useDeleteClass = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (id) => ClassDeleteAPI(id),
    retry: false,
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "classes"]);
    },
  });
};

export const useListSubject = ({
  page,
  size,
  sortBy,
  sortOrder,
}: FetchDataParams): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "subjects", page, size, sortBy, sortOrder],
    queryFn: () =>
      SubjectListAPI({
        page,
        size,
        sortBy,
        sortOrder,
      }),
  });
};

export const useCreateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: SubjectCreateAPI,
    retry: false,
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "subjects"]);
    },
  });
};

export const useUpdateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    // @ts-ignore
    mutationFn: (id: any, data: any) => SubjectUpdateAPI(id, data),
    retry: false,
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "subjects"]);
    },
  });
};

export const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (id) => ClassDeleteAPI(id),
    retry: false,
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "subjects"]);
    },
  });
};

export const useGetSubjectsFromClass = (id:any): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "class", "subjects"],
    queryFn: () => GetSubjectsFromClassAPI(id),
    enabled: !!id,
  });
};

interface AddSubjectsToClassData {
  subjectIds: string[];
}

export const useAddSubjectsToClass = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, [string, AddSubjectsToClassData]>({
    mutationFn: ([classId, data]: [string, AddSubjectsToClassData]) =>
      AddSubjectsToClassAPI(classId, data),
    retry: false,
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "class", "subjects"]);
    },
  });
};

export const useGetTeachersFromClass = (id: any): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "class", "teachers"],
    queryFn: () => GetTeachersFromClassAPI(id),
    enabled: !!id,
  });
};

export const useAddTeacherssToClass = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, [string, any]>({
    mutationFn: ([classId, data]: [string, any]) =>
      AddTeachersToClassAPI(classId, data),
    retry: false,
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "class", "teachers"]);
    },
  });
};

export const useDeleteTeacherFromClass = (classId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (id) => DeleteTeachersFromClassAPI(classId, id),
    retry: false,
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "class", "teachers"]);
    },
  });
};

export const useCreateExam = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, any>({
    mutationFn: (data) => ExamCreateAPI(data),
    retry: false,
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["admin", "class", "exams"]);
    },
  });
};

export const useListExam = (params: {
  studentId?: number;
}): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "class", "exams"],
    queryFn: () => ExamListAPI(params),
  });
};

export const useGetStudentsFromClass = (id : any): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "class", "students"],
    queryFn: () => GetStudentsFromClassAPI(id),
  });
};

export const useGetSubjectDataUsingClass = (id: any): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["admin", "class", "subjects"],
    queryFn: () => GetSubjectDataUsingClass(id),
    enabled: !!id,
  });
};
