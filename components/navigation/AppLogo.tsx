import { Group, UnstyledButton } from "@mantine/core";
import Image from "next/image";

export const AppLogo = ({ scrollToTop }: { scrollToTop: () => void }) => (
  <UnstyledButton
    className="flex cursor-pointer items-center lg:w-0 lg:flex-1"
    onClick={scrollToTop}
  >
    <Group>
      <div className="w-50 h-50 -mb-6">
        <Image
          src={'/SteppingStonesLogo2.png'}
          alt="Stepping Stones logo"
          width={80}
          height={80}
        />
      </div>
      <div className="-ml-6 flex flex-col">
        <h1 className="text-xl font-semibold uppercase text-indigo-900 sm:text-2xl">
          Stepping Stones
        </h1>
        <h3 className="text-xs capitalize text-sky-500">
          Business resource solutions
        </h3>
      </div>
    </Group>
  </UnstyledButton>
)