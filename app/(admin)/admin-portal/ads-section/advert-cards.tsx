import React from "react";
import AdvertCard from "./advert-card";
import { PartialAdvertSchemaProps } from "@models/Advert";

interface AdvertCardsProps {
  data: PartialAdvertSchemaProps[];
  isLoadingAds: boolean;
  onClick: (id: string) => void;
}

export default function AdvertCards({
  data,
  isLoadingAds,
  onClick,
}: AdvertCardsProps) {
  return (
    <>
      {data?.map((advert) => (
        <AdvertCard
          key={advert.id}
          data={advert}
          loading={isLoadingAds}
          className="h-auto w-full p-2"
          onClick={onClick}
        />
      ))}
    </>
  );
}
