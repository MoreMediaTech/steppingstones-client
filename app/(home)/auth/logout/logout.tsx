"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// redux store (Model)
import { useLogoutMutation } from "app/global-state/features/auth/authApiSlice";
import { useAppDispatch } from "app/global-state/hooks";
import { setAuthState } from "app/global-state/features/auth/authSlice";

export default function Logout() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    setTimeout(async () => {
      await logout();
      dispatch(setAuthState({ isAuthenticated: false }));
      router.push("/");
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
