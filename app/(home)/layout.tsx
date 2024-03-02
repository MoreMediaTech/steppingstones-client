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
import { getSession } from "@lib/getSession";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

function checkIsAuthenticated() {
  const session = getSession();

  if (!session) {
    return false;
  } else {
    return true;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <PageWrapper isAuthenticated={isAuthenticated}>
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
