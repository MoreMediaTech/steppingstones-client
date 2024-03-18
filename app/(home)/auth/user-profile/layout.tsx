import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import UserProfilePageWrapper from "./user-profile-page-wrapper";
// import { getSession } from "@lib/getSession";

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  function checkIsAuthenticated() {
    const session = cookies().get("connect.sid")?.value;
    if (!session) return null;

    if (!session) {
      return false;
    } else {
      return true;
    }
  }
  const isAuthenticated = checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect("/auth/login");
  }
  return <UserProfilePageWrapper>{children}</UserProfilePageWrapper>;
}
