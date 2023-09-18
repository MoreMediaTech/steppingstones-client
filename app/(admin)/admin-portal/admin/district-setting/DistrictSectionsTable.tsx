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
import { DistrictSchemaProps, DistrictSectionSchemaProps } from "@models/District";

const DistrictSectionsTable = ({
 district
}: {
  district: DistrictSchemaProps;
}) => {


  return (
    <Dialog>
      <Button
        type="button"
        asChild
        variant="ghost"
        className="w-full border-gray-900 dark:border-gray-200 "
      >
        <DialogTrigger>District Sections</DialogTrigger>
      </Button>
      <DialogContent className=" md:w-[80vw]">
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
