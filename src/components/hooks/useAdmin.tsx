"use client";

import { useSession } from "next-auth/react";

export const useAdmin = () => {
  const { data: session, status } = useSession();

  const isAdmin = session?.user?.role === "admin";
  const isLoading = status === "loading";
  const token = session?.accessToken;

  return { isAdmin, isLoading, token, user: session?.user };
};