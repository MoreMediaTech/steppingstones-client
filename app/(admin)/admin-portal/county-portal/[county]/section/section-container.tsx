import { BiEdit } from "react-icons/bi";

// components
import ContentPreview from "@components/ContentPreview";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";

// zod schemas
import { PartialSectionSchemaProps } from "@models/Section";

type SectionContainerProps = {
  data: PartialSectionSchemaProps;
  onClick?: () => void;
};

export function SectionContainer({
  data,
  onClick,
}: SectionContainerProps) {

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
              onClick={onClick}
              className="flex items-center gap-2"
            >
              <BiEdit fontSize={34} />
              Edit Section
            </Button>
          </div>

          <ContentPreview content={data} />
        </div>
    </section>
  );
}
