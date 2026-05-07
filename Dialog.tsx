"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

type ToggleGroupContextProps = VariantProps<typeof toggleVariants>;

const ToggleGroupContext =
  React.createContext<ToggleGroupContextProps>({
    variant: "default",
    size: "default",
  });

/* -------------------------------------------------------------------------- */
/*                                  Root                                      */
/* -------------------------------------------------------------------------- */

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(
  (
    {
      className,
      children,
      variant = "default",
      size = "default",
      ...props
    },
    ref
  ) => {
    return (
      <ToggleGroupContext.Provider value={{ variant, size }}>
        <ToggleGroupPrimitive.Root
          ref={ref}
          data-slot="toggle-group"
          className={cn(
            "flex w-fit items-center rounded-md",
            "overflow-hidden",
            "border border-border",
            "bg-background",
            className
          )}
          {...props}
        >
          {children}
        </ToggleGroupPrimitive.Root>
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

/* -------------------------------------------------------------------------- */
/*                                  Item                                      */
/* -------------------------------------------------------------------------- */

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(
  (
    {
      className,
      children,
      variant,
      size,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(ToggleGroupContext);

    return (
      <ToggleGroupPrimitive.Item
        ref={ref}
        data-slot="toggle-group-item"
        className={cn(
          toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
          }),
          "rounded-none border-0",
          "first:rounded-l-md",
          "last:rounded-r-md",
          "focus-visible:z-10",
          "transition-all duration-200",
          className
        )}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Item>
    );
  }
);

ToggleGroupItem.displayName =
  ToggleGroupPrimitive.Item.displayName;

/* -------------------------------------------------------------------------- */
/*                                  Export                                    */
/* -------------------------------------------------------------------------- */

export { ToggleGroup, ToggleGroupItem };
