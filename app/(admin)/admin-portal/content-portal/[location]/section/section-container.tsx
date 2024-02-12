import { BiEdit } from "react-icons/bi";
import Link from "next/link";

// components
import ContentPreview from "@components/ContentPreview";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";

// zod schemas
import { PartialSectionSchemaProps } from "@models/Section";

type SectionContainerProps = {
  data: PartialSectionSchemaProps;
  href?: string;
};

export function SectionContainer({ data, href }: SectionContainerProps) {
  return (
    <section className="relative w-full flex-grow py-8">
      <div className="w-full">
        <div className="mb-4 flex w-full items-center justify-between">
          {data?.isLive ? (
            <Badge>Live</Badge>
          ) : (
            <Badge variant="destructive">Not Live</Badge>
          )}
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            asChild
          >
            <Link href={href as string}>
              <BiEdit fontSize={30} />
              Edit Section
            </Link>
          </Button>
        </div>

        <ContentPreview content={data} />
      </div>
    </section>
  );
}
