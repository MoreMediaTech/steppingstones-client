import { DataTable } from "@components/table/data-table";
import { columns } from "./district-section-table-column";
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
  DistrictSchemaProps,
  DistrictSectionSchemaProps,
} from "@models/District";

const DistrictSectionsTable = ({
  district,
}: {
  district: DistrictSchemaProps;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full border-gray-900 dark:border-gray-200 "
        >
          District Sections
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:min-w-[700px] overflow-x-auto">
        <DialogHeader>
          <DialogTitle>{district.name} Sections</DialogTitle>
          <DialogDescription>
            The content sections for {district.name}
          </DialogDescription>
        </DialogHeader>

        <DataTable
          columns={columns}
          data={district.districtSections as DistrictSectionSchemaProps[]}
          name="name"
        />
      </DialogContent>
    </Dialog>
  );
};

export default DistrictSectionsTable;
