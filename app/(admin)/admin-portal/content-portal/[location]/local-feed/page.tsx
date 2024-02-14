import { ScrollArea } from "@components/ui/scroll-area";
import Content from "./content";

type Props = {
  searchParams: {
    location: string;
    contentId: string;
    localFeedContent: string;
    localFeedContentId: string;
  };
};

export default function Page({ searchParams }: Props) {
  return (
    <section className="px-2 sm:container sm:mx-auto">
      <Content searchParams={searchParams} />
    </section>
  );
}
