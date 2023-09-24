"use client";
import { Loader } from "@components/mantine-components";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/navigation";

// components
import ContentPreview from "app/components/ContentPreview";
import Header from "@components/Header";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";

// hooks (Controller)
import useCountyController from "../../use-county-controller";

type Props = { id: string; county: string };

export default function Welcome({ id, county }: Props) {
  const router = useRouter();

  const { county: countyData, isLoadingCounty } = useCountyController(
    id,
    undefined
  );

  if (isLoadingCounty) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    );
  }

  const handleClick = () => {
    router.push(`/admin-portal/county-portal/${county}/welcome/${id}`);
  };

  return (
    <section className="mx-auto space-y-2 py-2 sm:container">
      <section className="flex items-center justify-between py-2">
        <Header title="Welcome" order={1} />
        <Button
          type="button"
          className="md:w-1/4"
          onClick={() => {
            router.push(`/admin-portal/county-portal/${county}?countyId=${id}`);
          }}
        >
          Go Back
        </Button>
      </section>
      <section className=" w-full rounded-md border p-2">
        <div className="w-full space-y-4 ">
          <div className="flex w-full items-center justify-between">
            {countyData?.welcome?.isLive ? (
              <Badge>Live</Badge>
            ) : (
              <Badge variant="destructive">Not Live</Badge>
            )}
            <Button
              type="button"
              variant="outline"
              className="w-1/3"
              onClick={handleClick}
            >
              <BiEdit
                fontSize={30}
                className="text-gray-900 dark:text-gray-100"
              />
              Edit Welcome Section
            </Button>
          </div>

          <ContentPreview content={countyData?.welcome} />
        </div>
      </section>
    </section>
  );
}
