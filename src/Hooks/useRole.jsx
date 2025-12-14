import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user.email, //if loading is true then it will be disable the query
    queryKey: ["userData", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/role`);
      return data;
    },
  });

  return [userData, isRoleLoading];
};

export default useRole;
