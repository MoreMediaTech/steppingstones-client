"use client";

// components
import HandleDeleteModal from "@components/HandleDeleteModal/HandleDeleteModal";
import { UpdateEconomicData } from "./update-economic-data";
import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Separator } from "@components/ui/separator";

// hooks (Controller)
import useEconomicDataController from "./use-economic-data-controller";

// zod schemas
import {
  EconomicDataSchemaProps,
  PartialEconomicDataSchemaProps,
} from "@models/District";

type EconomicDataWidgetProps = React.ComponentProps<typeof Card> & {
  economicData: PartialEconomicDataSchemaProps;
};

const EconomicDataWidget = ({
  economicData,
  className,
  ...props
}: EconomicDataWidgetProps) => {
  const { handleDelete } = useEconomicDataController(
    undefined,
    undefined,
    undefined
  );

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>{economicData?.title}</CardTitle>
        <CardDescription>
          {`${economicData?.stats}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col items-center space-x-4 rounded-md border p-4 text-center">
          <div className="flex-col space-y-1 text-center">
            <p className="text-sm font-medium leading-none">
              {economicData?.descriptionLine1}
            </p>
            <p className="text-sm font-medium leading-none">
              {economicData?.descriptionLine2}
            </p>
          </div>
          <a
            href={economicData?.linkUrl}
            target="_"
            className="text-sm text-muted-foreground"
          >
            {economicData?.linkName}
          </a>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between gap-4">
          <UpdateEconomicData economicDataId={economicData?.id as string} />
          <HandleDeleteModal
            data={economicData as EconomicDataSchemaProps}
            deleteHandler={handleDelete}
            className="justify-end rounded-md border text-red-500 border-red-500 text-sm hover:bg-red-500 hover:text-white"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default EconomicDataWidget;
