"use client";

import { Button } from "@components/ui/button";
import Link from "next/link";
import React from "react";

export default function ErrorPage({ error }: { error: Error }) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-3xl font-bold text-destructive">
          Something went wrong
        </h1>
        <p className="text-center text-lg">{error.message}</p>
        <Button asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </div>
  );
}
