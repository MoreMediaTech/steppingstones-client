"use client";

import React from "react";
import { BiEdit } from "react-icons/bi";

// components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { EconomicDataForm } from "./economic-data-form";
import { Button } from "@components/ui/button";
import { Loader } from "@components/mantine-components";

// hooks (Controller)
import useEconomicDataController from "./use-economic-data-controller";

export function UpdateEconomicData({
  economicDataId,
}: {
  economicDataId: string;
}) {
  const [open, setOpen] = React.useState(false);

  const {
    economicDataWidget,
    form,
    isLoadingWidget,
    updateEconomicDataHandler,
  } = useEconomicDataController(undefined, economicDataId, setOpen);

  let defaultValues = {
    title: economicDataWidget?.title
      ? (economicDataWidget?.title as string)
      : "",
    stats: economicDataWidget?.stats
      ? (economicDataWidget?.stats as string)
      : "",
    descriptionLine1: economicDataWidget?.descriptionLine1
      ? (economicDataWidget?.descriptionLine1 as string)
      : "",
    descriptionLine2: economicDataWidget?.descriptionLine2
      ? (economicDataWidget?.descriptionLine2 as string)
      : "",
    linkName: economicDataWidget?.linkName
      ? (economicDataWidget?.linkName as string)
      : "",
    linkUrl: economicDataWidget?.linkUrl
      ? (economicDataWidget?.linkUrl as string)
      : "",
  };

  React.useEffect(() => {
    form.reset({ ...defaultValues });
  }, [economicDataWidget]);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="outline"
        asChild
        className=" border-gray-900 dark:border-gray-200"
      >
        <DialogTrigger>
          <BiEdit fontSize={20} />
          Edit
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Economic data</DialogTitle>
          <DialogDescription>
            edit the form below to update the economic data
          </DialogDescription>
        </DialogHeader>

        {isLoadingWidget ? (
          <div className="flex h-[500px] w-[500px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <EconomicDataForm form={form} onSubmit={updateEconomicDataHandler} />
        )}
      </DialogContent>
    </Dialog>
  );
}
