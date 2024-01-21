import React from "react";
import { Montserrat } from "next/font/google";
import "../globals.css";

// redux store (Model)
import Provider from "../global-state/providers/provider";

// Layout wrapper component
import PageWrapper from "./PageWrapper";

// components
import { Toaster } from "@app/components/ui/toaster";
import { Navbar } from "app/components/navigation";
import Footer from "app/components/footer";
import CookieConsentComponent from "@components/CookieConsent/CookieConsentComponent";
import { cn } from "@lib/utils";
// import { cookies } from "next/headers";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

// function to check if cookie exists
// TODO: Resolve issue caused by recent nextjs update that broke cookies method in next/headers module
// function checkUserCookie() {
//   const cookie = cookies();
//   const userCookie = cookie.get("ss_refresh_token");
//   if (userCookie) {
//     return true;
//   }
//   return false;
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html
      lang="en"
      className={cn(` light font-montserrat sm:scroll-smooth`, montserrat.variable)}
      style={{ scrollBehavior: "smooth", colorScheme: "light" }}
    >
      <body className="relative grid min-h-screen grid-cols-1 bg-background">
        <Provider>
          <Navbar />
          <PageWrapper>{children}</PageWrapper>
          <Footer />
          <Toaster />
          <CookieConsentComponent />
        </Provider>
      </body>
    </html>
  );
}
