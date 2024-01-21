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
import { PartialAdvertSchemaProps } from "@models/Advert";

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
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        {imageUrl ? (
          <Image src={imageUrl} alt={title as string} width={40} height={40} />
        ) : null}
        <CardTitle className="text-xs font-medium text-muted-foreground">
          <Title order={4}>{title}</Title>
        </CardTitle>
      </CardHeader>
      <CardContent>
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
        <Button variant={"outline"} onClick={() => onClick(id as string)}>
          <MdDelete className="text-lg" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
