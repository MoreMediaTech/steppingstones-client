import { ScrollArea } from "@components/ui/scroll-area";
import Content from "./content";

type Props = {
  params: { location: string; id: string;};
  searchParams: {
    contentId: string;
    localFeedContent: string;
    localFeedContentId: string;
  };
};

export default function Page({ params, searchParams }: Props) {
  return (
    <section className="px-2 sm:container sm:mx-auto">
      <ScrollArea className=" sm:h-screen  sm:p-4 ">
        <Content
          id={params.id}
          location={params.location}
          contentId={searchParams.contentId}
          localFeedContent={searchParams.localFeedContent}
          localFeedContentId={searchParams.localFeedContentId}
        />
      </ScrollArea>
    </section>
  );
}
