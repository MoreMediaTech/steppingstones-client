"use client";

// components
import { PartnerDirectoryTable } from "./PartnerDirectoryTable";
import { Loader } from "@components/mantine-components";

// hooks  (Controller)
import usePartnerDirectoryController from "./use-partner-directory-controller";

export function PartnerDirectory() {
  const { isLoadingPartnerData } = usePartnerDirectoryController();

  if (isLoadingPartnerData) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    );
  }
  return (
    <>
      <PartnerDirectoryTable />
    </>
  );
}
