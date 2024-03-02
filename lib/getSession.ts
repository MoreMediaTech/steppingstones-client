import { cookies } from "next/headers";

export function getSession() {
  const session = cookies().get("connect.sid")?.value;
  if (!session) return null;
  return session;
}

export function deleteSession() {
  return cookies().delete("connect.sid");
}
