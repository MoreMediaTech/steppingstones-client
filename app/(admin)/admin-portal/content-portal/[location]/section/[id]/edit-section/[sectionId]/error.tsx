"use client";

import { Button } from "@components/ui/button";
import Link from "next/link";
import React from "react";

export default function ErrorPage({ error }: { error: Error }) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl text-destructive font-bold text-center">
          Something went wrong
        </h1>
        <p className="text-lg text-center">{error.message}</p>
        <Button asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </div>
  );
}
