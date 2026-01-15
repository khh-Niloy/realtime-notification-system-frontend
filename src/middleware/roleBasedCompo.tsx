import { Navigate } from "react-router-dom";
import type { TRole } from "@/constant/constValues";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { type ComponentType } from "react";
import { Loading } from "@/components/Loading";

export const roleBasedCompo = (
  Component: ComponentType,
  requiredRole?: TRole
) => {
  return function AuthWrapper() {
    const { data: user, isLoading } = useUserInfoQuery(undefined);

    if (isLoading) {
      return <Loading />;
    }

    if (!user || !user.email) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Component />;
  };
};
