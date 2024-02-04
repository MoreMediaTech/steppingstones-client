"use client";

import React from "react";

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

// hooks (Controller)
import useEconomicDataController from "./use-economic-data-controller";

export function CreateEconomicData({
  sectionId,
}: {
  sectionId: string;
}) {
  const [open, setOpen] = React.useState(false);

  const { form, createEconomicDataHandler } = useEconomicDataController(
    sectionId,
    undefined,
    setOpen,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="outline"
        asChild
        className="w-full border-gray-900 dark:border-gray-200"
      >
        <DialogTrigger>Add Data</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Economic data</DialogTitle>
          <DialogDescription>
            fill in the form below to create a new economic data
          </DialogDescription>
        </DialogHeader>

        <EconomicDataForm form={form} onSubmit={createEconomicDataHandler} />
      </DialogContent>
    </Dialog>
  );
}
