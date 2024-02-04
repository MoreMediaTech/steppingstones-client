import Header from "app/components/Header";
import { CreateCountyForm } from "./feed-content/create-feed-content-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { FeedContentSettings} from "./feed-content/feed-content-settings";
import { LocalFeedSettings } from "./local-feed/local-feed-settings";
import { SectionsSettings } from "./section/SectionSettings";

export default function Page() {
  return (
    <section className="container mx-2 my-4 mb-8 mt-4 overflow-y-auto overflow-x-hidden rounded-md border px-2 py-2 sm:mx-auto  sm:px-4">
      <Tabs defaultValue="county" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="county" className="text-xs sm:text-sm">
            Manage County
          </TabsTrigger>
          <TabsTrigger value="district" className="text-xs sm:text-sm">
            Manage District
          </TabsTrigger>
          <TabsTrigger value="section" className="text-xs sm:text-sm">
            Manage Section
          </TabsTrigger>
        </TabsList>
        <TabsContent value="county">
          <section className="my-2 w-full space-y-4 overflow-y-auto rounded-md border px-2 py-4 sm:my-0 sm:mt-20  sm:px-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Header title="County Settings" order={2} />
              <CreateCountyForm />
            </div>
            <FeedContentSettings/>
          </section>
        </TabsContent>
        <TabsContent value="district">
          <section className="my-2 w-full overflow-y-auto rounded-md border px-2 py-4 sm:my-0 sm:mt-20  sm:px-4">
            <div className="flex flex-col gap-4">
              <Header title="District Setting" order={2} />
              <LocalFeedSettings />
            </div>
          </section>
        </TabsContent>
        <TabsContent value="section">
          <section className=" my-2 w-full overflow-y-auto rounded-md border px-2 py-4 sm:my-0 sm:mt-20  sm:px-4 ">
            <div className="flex flex-col gap-4">
              <Header title="Section Settings" order={2} />
              <SectionsSettings />
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </section>
  );
}
