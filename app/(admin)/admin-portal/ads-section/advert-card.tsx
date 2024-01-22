import React from "react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";

// components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";
import Title from "@components/title";
import EditAds from "./edit-ads";
import { AdvertSchemaProps, PartialAdvertSchemaProps } from "@models/Advert";
import HandleDeleteModal from "@components/HandleDeleteModal/HandleDeleteModal";
import { cn } from "@lib/utils";

interface AdvertCardProps {
  data: PartialAdvertSchemaProps;
  loading: boolean;
  className: string;
  onClick: (id: string) => void;
}

export default function AdvertCard({
  data,
  loading,
  className,
  onClick,
}: AdvertCardProps) {
  const { title, imageUrl, summary, id } = data;
  return (
    <Card className={cn("relative flex flex-col", className)}>
      <CardHeader className="flex flex-col items-center space-y-4 pb-2">
        {imageUrl ? (
          <div style={{ position: "relative", height: "200px", width: '100%' }}>
            <Image
              src={imageUrl}
              alt={title as string}
              fill
              sizes="100vw"
              style={{
                objectFit: "contain", // cover, contain, none
              }}
            />
          </div>
        ) : null}
        <CardTitle className="text-base font-montserrat font-bold text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow">
        <div className="font-cold text-xl">
          {loading ? (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          ) : (
            <p className="pt-1 text-xs text-muted-foreground">{summary}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between pt-2">
        <EditAds advert={data} />
        <HandleDeleteModal
          data={data as AdvertSchemaProps}
          deleteHandler={onClick}
        />
      </CardFooter>
    </Card>
  );
}
