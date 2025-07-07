import { useCustomMutation } from "@/hooks/http";
import type { LoginResponse, LoginInput } from "../interface";

export const useLoginMutation = () => {
  return useCustomMutation<LoginResponse, LoginInput>({
    url: "/auth/login",
    baseURL:"https://dummyjson.com",
  });
};
