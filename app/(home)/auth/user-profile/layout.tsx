import React from "react";

import UserProfilePageWrapper from "./user-profile-page-wrapper";

// function checkIsAuthenticated() {
//   const session = getSession();

//   if (!session) {
//     return false;
//   } else {
//     return true;
//   }
// }

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProfilePageWrapper>{children}</UserProfilePageWrapper>;
}
