import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { Toaster } from "@components/ui/toaster";
import { Montserrat } from "next/font/google";
import AdminPageWrapper from "./admin-portal-wrapper";
import Provider from "../global-state/providers/provider";

import "../globals.css";
import { cn } from "@lib/utils";
// import { getSession } from "@lib/getSession";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default function AdminRootLayout({
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
  return (
    <html
      lang="en"
      className={cn(`font-montserrat sm:scroll-smooth`, montserrat.variable)}
    >
      <body className="min-h-screen bg-background">
        <Provider>
          <AdminPageWrapper isAuthenticated={isAuthenticated}>
            {children}
          </AdminPageWrapper>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
