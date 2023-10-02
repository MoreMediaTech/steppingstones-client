import React from "react";
import { cookies } from "next/headers";
import { Toaster } from "@components/ui/toaster";
import AdminPageWrapper from "./AdminPageWrapper";
import Provider from "../global-state/providers/provider";

import "../globals.css";

function checkUserCookie() {
  const cookie = cookies();
  console.log("checking auth");
  const userCookie = cookie.get("ss_refresh_token");

  if (!userCookie) {
    console.log("auth failed");
    return false;
  }
  return true;
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isCookie = checkUserCookie();

  return (
    <html lang="en" className={`font-montserrat sm:scroll-smooth`}>
      <body className="min-h-screen bg-background">
        <Provider>
          <AdminPageWrapper isCookie={isCookie}>{children}</AdminPageWrapper>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
