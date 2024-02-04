import { ScrollArea } from '@components/ui/scroll-area'
import SubSection from './sub-section'

type Props = {
  params: { location: string; id: string; };
  searchParams: {
    location: string;
    contentId: string;
    sectionId: string;
  };
};

export default function Page({ params, searchParams }: Props) {
  return (
    <section className="px-2 sm:container sm:mx-auto">
      <ScrollArea className=" sm:p-4  sm:h-screen ">
        <SubSection params={params} searchParams={searchParams} />
      </ScrollArea>
    </section>
  )
}
