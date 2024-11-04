import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const CustomUnitSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    leftLabel: string;
    rightLabel: string;
  }
>(({ className, leftLabel, rightLabel, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer relative inline-flex h-10 w-28 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-700 data-[state=unchecked]:bg-gray-700",
      className
    )}
    {...props}
    ref={ref}
  >
    <span className="absolute left-4 text-xs font-medium text-white">
      {props.checked ? leftLabel : ""}
    </span>
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-7 w-12 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[3.25rem] data-[state=unchecked]:translate-x-1"
      )}
    >
      <span className="flex h-full z-10 w-full items-center justify-center text-xs font-medium">
        {props.checked ? rightLabel : leftLabel}
      </span>
    </SwitchPrimitives.Thumb>
    <span className="absolute right-4 text-xs font-medium text-white">
      {props.checked ? "" : rightLabel}
    </span>
  </SwitchPrimitives.Root>
));
CustomUnitSwitch.displayName = "CustomUnitSwitch";

export { CustomUnitSwitch };
