import Header from "app/components/Header";
import { CreateCountyForm } from "./county/CreateCountyForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { CountySettings } from "./county/CountySettings";
import { DistrictSettings } from "./district/DistrictSettings";
import { SectionsSettings } from "./section/SectionSettings";

export default function Page() {
  return (
    <section className="my-4 mb-8 mt-4 overflow-y-auto overflow-x-hidden rounded-md border px-2 py-2 sm:mx-auto sm:max-w-screen-lg sm:px-4">
      <Tabs defaultValue="county" className="w-full">
        <TabsList>
          <TabsTrigger value="county">Manage County</TabsTrigger>
          <TabsTrigger value="district">Manage District</TabsTrigger>
          <TabsTrigger value="section">Manage Section</TabsTrigger>
        </TabsList>
        <TabsContent value="county">
          <section className="my-2 w-full overflow-y-auto rounded-md border px-2 py-4 sm:my-0 sm:mt-20  sm:px-4">
            <div className="grid grid-cols-1 gap-4">
              <Header title="County Settings" order={2} />
              <CreateCountyForm />
            </div>
            <CountySettings />
          </section>
        </TabsContent>
        <TabsContent value="district">
          <section className="my-2 w-full overflow-y-auto rounded-md border px-2 py-4 sm:my-0 sm:mt-20  sm:px-4">
            <div className="grid grid-cols-1 gap-4">
              <Header title="District Setting" order={2} />
              <DistrictSettings />
            </div>
          </section>
        </TabsContent>
        <TabsContent value="section">
          <section className=" my-2 w-full overflow-y-auto rounded-md border px-2 py-4 sm:my-0 sm:mt-20  sm:px-4 ">
            <div className="grid grid-cols-1 gap-4">
              <Header title="Section Settings" order={2} />
              <SectionsSettings />
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </section>
  );
}
