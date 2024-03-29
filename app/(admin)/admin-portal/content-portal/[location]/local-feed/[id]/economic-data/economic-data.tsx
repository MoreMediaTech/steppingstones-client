"use client";

import { useRouter } from "next/navigation";

// components
import Loader from "@components/Loader";
import EconomicDataWidget from "./economic-data-widget";
import Header from "@components/Header";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@components/ui/form";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { Checkbox } from "@components/ui/checkbox";
import { cn } from "@lib/utils";

// zod schemas
import { PartialEconomicDataSchemaProps } from "@models/LocalFeedContent";

// hooks (Controller)
import useEconomicDataController from "./use-economic-data-controller";
import useLocalFeedController from "../../use-local-feed-controller";
import { CreateEconomicData } from "./create-economic-data";
import { useEffect } from "react";

export function EconomicData({
  sectionId,
}: {
  sectionId: string;
}) {
  const router = useRouter();
  const { economicDataWidgets, isLoading } = useEconomicDataController(
    sectionId,
    undefined,
    undefined,
  );

  const { section, form, isUpdatingSection, setEDLive } =
    useLocalFeedController(undefined, sectionId, undefined);

  const defaultValues = {
    isLive: section?.isLive,
  };

  useEffect(() => {
    form.reset({ ...defaultValues });
  }, [section]);

  if (isLoading) {
    return (
      <section className="relative w-full space-y-4 px-2 py-2 md:container md:mx-auto md:h-screen  md:px-8 md:py-8">
        <div className="mb-6 flex w-full flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
          <Header title={`Economic Data`} order={1} />
          <div className="flex w-full flex-col items-center gap-2 md:flex-row">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
            <CreateEconomicData sectionId={sectionId} />
          </div>
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <Loader className="h-12 w-12" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full space-y-4 px-2 py-2 md:container md:mx-auto md:h-screen  md:px-8 md:py-8">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        <Header title={`Economic Data`} order={1} />
        <div className="flex w-full flex-col items-center gap-2 md:flex-row">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
          <CreateEconomicData sectionId={sectionId} />
        </div>
      </div>
      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(setEDLive)} className="space-y-8">
              <FormField
                control={form.control}
                name="isLive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(event) =>
                          field.onChange(event as boolean)
                        }
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Is Live? <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormDescription>
                        Confirm if the economic data is live
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <div className="my-4 flex w-full items-center justify-between ">
                <Button type="submit">
                  {isUpdatingSection ? (
                    <>
                      <Loader className="mr-2 h-4 w-4" /> <span>Saving...</span>
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="grid w-full grid-cols-1 gap-4  text-xl md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {economicDataWidgets?.map(
          (economicData: PartialEconomicDataSchemaProps) => (
            <EconomicDataWidget
              key={economicData.id}
              economicData={economicData}
            />
          ),
        )}
      </div>
    </section>
  );
}
