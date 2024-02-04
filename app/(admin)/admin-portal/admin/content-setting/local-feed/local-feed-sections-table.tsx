import { DataTable } from "@components/table/data-table";
import { columns } from "./local-feed-section-table-column";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import {
  PartialLocalFeedContentSchemaProps
} from "@models/LocalFeedContent";

const LocalFeedSectionsTable = ({
  localFeedData,
}: {
  localFeedData: PartialLocalFeedContentSchemaProps;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full border-gray-900 dark:border-gray-200 "
        >
          localFeedData Sections
        </Button>
      </DialogTrigger>
      <DialogContent className=" overflow-x-auto sm:min-w-[800px]">
        <DialogHeader>
          <DialogTitle>{localFeedData.name} Sections</DialogTitle>
          <DialogDescription>
            The content sections for {localFeedData.name}
          </DialogDescription>
        </DialogHeader>

        <DataTable
          columns={columns}
          data={localFeedData.sections as PartialLocalFeedContentSchemaProps[]}
          name="name"
        />
      </DialogContent>
    </Dialog>
  );
};

export default LocalFeedSectionsTable;
