import React from "react";

// components
import UserProfilePageWrapper from "./user-profile-page-wrapper";

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProfilePageWrapper>{children}</UserProfilePageWrapper>;
}
