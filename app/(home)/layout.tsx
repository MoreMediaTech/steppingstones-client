import React from "react";
import { Montserrat } from "next/font/google";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
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
// import { getSession } from "@lib/getSession";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
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
      console.log("Session found");
      return true;
    }
  }
  const isAuthenticated = checkIsAuthenticated();

  return (
    <html
      lang="en"
      className={cn(
        ` light font-montserrat sm:scroll-smooth`,
        montserrat.variable,
      )}
      style={{ scrollBehavior: "smooth", colorScheme: "light" }}
    >
      <body className="relative grid min-h-screen grid-cols-1 bg-background">
        <Provider>
          <Navbar />
          <PageWrapper isAuthenticated={isAuthenticated as boolean}>
            {children}
          </PageWrapper>
          <Footer />
          <Toaster />
          <CookieConsentComponent />
        </Provider>
      </body>
    </html>
  );
}
