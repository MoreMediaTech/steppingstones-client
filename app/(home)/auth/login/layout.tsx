import { redirect } from "next/navigation";
import { cookies } from "next/headers";
// import { getSession } from "@lib/getSession";
import LoginPageWrapper from "./LoginPageWrapper";

export default function LoginLayout({
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

  if (isAuthenticated) {
    redirect("/admin-portal");
  }
  return (
    <LoginPageWrapper isAuthenticated={isAuthenticated as boolean}>
      {children}
    </LoginPageWrapper>
  );
}
