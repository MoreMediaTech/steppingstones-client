import LoginPageWrapper from "./LoginPageWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LoginPageWrapper>{children}</LoginPageWrapper>;
}
