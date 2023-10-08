import React from "react";
// import { cookies } from "next/headers";
import { Toaster } from "@components/ui/toaster";
import AdminPageWrapper from "./AdminPageWrapper";
import Provider from "../global-state/providers/provider";

import "../globals.css";

// function to check if cookie exists
// TODO: Resolve issue caused by recent nextjs update that broke cookies method in next/headers module
// function checkUserCookie() {
//   const cookie = cookies();
//   console.log("checking auth");
//   const userCookie = cookie.get("ss_refresh_token");

//   if (!userCookie) {
//     console.log("auth failed");
//     return false;
//   }
//   return true;
// }

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={`font-montserrat sm:scroll-smooth`}>
      <body className="min-h-screen bg-background">
        <Provider>
          <AdminPageWrapper>{children}</AdminPageWrapper>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
