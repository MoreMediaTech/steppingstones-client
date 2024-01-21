"use client";
import React, { Suspense } from "react";

// components
import Header from "@components/Header";
import { Separator } from "@components/ui/separator";
import CreateAds from "./create-ads";
import CardSkeleton from "@components/card-skeleton";
import AdvertCards from "./advert-cards";

// hooks
import useAdsSectionController from "./use-ads-section-controller";

export default function AdsComponent() {
  const { data, isLoadingAds, deleteAdHandler } = useAdsSectionController();

  return (
    <section>
      <div className="flex w-full items-center justify-between py-2">
        <Header title="Advertisements" order={1} />
        <CreateAds />
      </div>
      <Separator className="my-6" />
      <div className="grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={[1, 2, 2].map((el) => (
            <CardSkeleton key={el} />
          ))}
        >
          <AdvertCards data={data as any} onClick={deleteAdHandler} isLoadingAds={isLoadingAds} />
        </Suspense>
      </div>
    </section>
  );
}
