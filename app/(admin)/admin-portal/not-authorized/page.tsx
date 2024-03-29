"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@components/ui/button";

export default function NotAuthorized() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/admin-portal");
    }, 5000);
  }, []);
  return (
    <section className="flex h-screen items-center justify-center overflow-hidden  text-gray-900 dark:text-gray-100">
      <div className="mt-20 flex flex-col ">
        <Image
          src={"/android-chrome-512x512.png"}
          alt="Steppingstones logo"
          width={300}
          height={300}
        />
        <h1 className="my-5 text-6xl">Whoops!</h1>
        <h2 className="mb-5 text-4xl text-gray-500 dark:text-gray-300">
          Not authorized to access this page. Login as an Partner or go back to
          the home page.
        </h2>
        <div className="flex justify-center">
          <Button type="button" onClick={() => router.back()}>
            GO BACK
          </Button>
        </div>
      </div>
    </section>
  );
}
