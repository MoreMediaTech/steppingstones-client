import React from "react";

import UserProfilePageWrapper from "./user-profile-page-wrapper";
import { getSession } from "@lib/getSession";
import { redirect } from "next/navigation";

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
