import LoginPageWrapper from "./LoginPageWrapper";


export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LoginPageWrapper>{children}</LoginPageWrapper>;
}
