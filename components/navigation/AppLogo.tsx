import { Group, UnstyledButton } from "@mantine/core";
import Image from "next/image";

export const AppLogo = ({ scrollToTop }: { scrollToTop: () => void }) => (
  <UnstyledButton
    className="flex cursor-pointer items-center lg:w-0 lg:flex-1"
    onClick={scrollToTop}
  >
    <Group className=" gap-6 md:gap-8 flex items-center">
      <div className="relative flex md:w-50 h-50 -mb-1 ">
        <Image
          src={'/steppingstonesapplogo.png'}
          alt="Stepping Stones logo"
         height={55}
          width={55}
        />
      </div>
      <div className="-ml-6 flex flex-col">
        <h1 className="md:text-xl font-bold uppercase text-[#5E17EB] text-lg">
          Stepping Stones
        </h1>
        <h3 className="text-[#00DCB3] text-xs md:text-sm capitalize">
          Business resource solutions
        </h3>
      </div>
    </Group>
  </UnstyledButton>
)