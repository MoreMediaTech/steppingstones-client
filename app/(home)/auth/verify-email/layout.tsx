import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getSession } from "@lib/getSession";

export default function ForgotPasswordLayout({
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

  if (isAuthenticated) {
    redirect("/admin-portal");
  }
  return <section>{children}</section>;
}
