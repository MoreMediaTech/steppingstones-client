"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@components/ui/button";
import useHasMounted from "@hooks/useHasMounted";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const onClickGoBackButton = useCallback(() => {
    router.back();
  }, []);

  const onClickTryAgainButton = useCallback(() => {
    reset();
  }, []);

  return (
    <html lang="en" className="sm:scroll-smooth">
      <body className="flex min-h-screen flex-row-reverse bg-slate-100 dark:bg-slate-900">
        <div className="container relative mx-auto flex flex-col items-center justify-center space-y-2">
          <Image
            src={"/android-chrome-512x512.png"}
            alt="Stepping Stones Logo"
            width={300}
            height={300}
          />
          <h1 className="my-5 text-6xl">Whoops!</h1>
          <h2 className="mb-3 text-3xl">Something went wrong!</h2>
          <p className="mb-3 text-xl">
            {error.name}: {error.message}
          </p>
          <div className="flex w-full items-center justify-center gap-6">
            <Button type="button" onClick={onClickTryAgainButton}>
              Try again
            </Button>

            <Button type="button" onClick={onClickGoBackButton}>
              Go back
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
