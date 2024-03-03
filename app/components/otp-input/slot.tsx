import { SlotProps } from "input-otp";
import { cn } from "@lib/utils";
import { FakeCaret } from "./fake-caret";

export function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative h-14 w-10 text-[2rem]",
        "flex items-center justify-center",
        "transition-all duration-300",
        "border-y border-r border-border first:rounded-l-md first:border-l last:rounded-r-md",
        "group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20",
        "outline-accent-foreground/20 outline outline-0",
        { "outline-accent-foreground outline-4": props.isActive },
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}
