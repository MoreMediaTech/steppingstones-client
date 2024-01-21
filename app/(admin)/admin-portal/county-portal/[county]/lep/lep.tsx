"use client";

import Loader from "@components/Loader";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/navigation";

// components
import ContentPreview from "app/components/ContentPreview";
import { Button } from "@components/ui/button";
import Header from "@components/Header";
import { Badge } from "@components/ui/badge";

// hooks (Controller)
import useCountyController from "../../use-county-controller";

type Props = {
  id: string;
  county: string;
};

export default function LEP({ id, county }: Props) {
  const router = useRouter();

  const { county: countyData, isLoadingCounty } = useCountyController(
    id,
    undefined
  );

  if (isLoadingCounty) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader className="h-12 w-12" />
      </div>
    );
  }

  const handleClick = () => {
    router.push(`/admin-portal/county-portal/${county}/lep/${id}`);
  };

  return (
    <section className="space-y-2 ">
      <section className="flex items-center justify-between">
        <Header title="LEP" order={1} />
        <Button
          type="button"
          className="w-1/3 md:w-1/4"
          onClick={() => {
            router.push(`/admin-portal/county-portal/${county}?countyId=${id}`);
          }}
        >
          Go Back
        </Button>
      </section>

      <section className="w-full rounded-md border p-2">
        <div className="w-full space-y-4">
          <div className="flex w-full items-center justify-between">
            {countyData?.lep?.isLive ? (
              <Badge>Live</Badge>
            ) : (
              <Badge variant="destructive">Not Live</Badge>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={handleClick}
              className="w-1/3"
            >
              <BiEdit
                fontSize={34}
                className="text-gray-900 dark:text-primary-light-100"
              />
            </Button>
          </div>

          <ContentPreview content={countyData?.lep} />
        </div>
      </section>
    </section>
  );
}
