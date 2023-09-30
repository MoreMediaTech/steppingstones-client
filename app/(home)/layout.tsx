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
import { cookies } from "next/headers";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

function checkUserCookie() {
  const cookie = cookies();
  const userCookie = cookie.get("ss_refresh_token");
  if (userCookie) {
    return true;
  }
  return false;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isCookie = checkUserCookie();
  return (
    <html
      lang="en"
      className={`${montserrat.variable} light font-montserrat sm:scroll-smooth`}
      style={{ scrollBehavior: "smooth", colorScheme: "light" }}
    >
      <body className="relative grid min-h-screen grid-cols-1 bg-background">
        <Provider>
          <Navbar />
          <PageWrapper isCookie={isCookie}>{children}</PageWrapper>
          <Footer />
          <Toaster />
          <CookieConsentComponent />
        </Provider>
      </body>
    </html>
  );
}
