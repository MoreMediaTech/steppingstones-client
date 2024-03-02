import { getSession } from "@lib/getSession";
import { redirect } from "next/navigation";
import LoginPageWrapper from "./LoginPageWrapper";

function checkIsAuthenticated() {
  const session = getSession();

  if (!session) {
    return false;
  } else {
    return true;
  }
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = checkIsAuthenticated();

  if (isAuthenticated) {
    redirect("/admin-portal");
  }
  return (
    <LoginPageWrapper isAuthenticated={isAuthenticated}>
      {children}
    </LoginPageWrapper>
  );
}
