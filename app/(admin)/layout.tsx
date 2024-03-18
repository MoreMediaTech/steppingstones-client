import React from "react";
// import { cookies } from "next/headers";

import { Toaster } from "@components/ui/toaster";
import { Montserrat } from "next/font/google";
import AdminPageWrapper from "./admin-portal-wrapper";
import Provider from "../global-state/providers/provider";

import "../globals.css";
import { cn } from "@lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// function checkIsAuthenticated() {
//   const session = getSession();

//   if (!session) {
//     return false;
//   } else {
//     console.log("Session found");
//     return true;
//   }
// }

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(`font-montserrat sm:scroll-smooth`, montserrat.variable)}
    >
      <body className="min-h-screen bg-background">
        <Provider>
          <AdminPageWrapper>{children}</AdminPageWrapper>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
