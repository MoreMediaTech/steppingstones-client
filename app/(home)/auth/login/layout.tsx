import LoginPageWrapper from "./LoginPageWrapper";

// function checkIsAuthenticated() {
//   const session = getSession();

//   if (!session) {
//     return false;
//   } else {
//     return true;
//   }
// }

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LoginPageWrapper>{children}</LoginPageWrapper>;
}
