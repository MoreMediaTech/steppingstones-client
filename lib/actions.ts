"use server";

import { cookies } from "next/headers";

export async function deleteSession() {
  return cookies().delete("connect.sid");
}
