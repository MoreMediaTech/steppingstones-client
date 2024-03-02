import React from "react";
import { redirect } from "next/navigation";

import UserProfilePageWrapper from "./user-profile-page-wrapper";
import { getSession } from "@lib/getSession";

function checkIsAuthenticated() {
  const session = getSession();

  if (!session) {
    return false;
  } else {
    return true;
  }
}

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect("/auth/login");
  }
  return <UserProfilePageWrapper>{children}</UserProfilePageWrapper>;
}
