"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useLogoutMutation } from "app/global-state/features/auth/authApiSlice";

// redux store (Model)
import { useAppDispatch } from "app/global-state/hooks";
import { setAuthState } from "app/global-state/features/auth/authSlice";

export default function Logout() {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    setTimeout(async () => {
      localStorage.removeItem("_ssapp:token");
      await logout();
      dispatch(setAuthState({ isAuthenticated: false, token: null }));
      redirect("/");
    }, 4000);
  }, []);

  return (
    <>
      <h1 className="font-mono text-3xl font-medium dark:text-gray-200">
        Logging out.......
      </h1>
    </>
  );
}
