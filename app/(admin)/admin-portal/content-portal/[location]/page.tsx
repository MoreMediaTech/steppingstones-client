import { ScrollArea } from '@components/ui/scroll-area'
import Content from './content'

type Props = {
  params: { location: string }
  searchParams: { contentId: string }
}

export default function Page({ params, searchParams }: Props) {
  return (
    <section className="w-full">
      <ScrollArea className="w-full ">
        <Content location={params.location} contentId={searchParams.contentId} />
      </ScrollArea>
    </section>
  );
}
