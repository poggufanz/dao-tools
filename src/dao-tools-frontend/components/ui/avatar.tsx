import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* size variants */
const avatarVariants = cva("relative flex shrink-0 overflow-hidden rounded-full", {
  variants: {
    size: {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

/* Root container — now a plain `div`, NOT a Slot */
const Avatar = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof avatarVariants>
>(({ className, size, ...props }, ref) => (
  <div ref={ref} className={cn(avatarVariants({ size, className }))} {...props} />
))
Avatar.displayName = "Avatar"

/* Image */
const AvatarImage = React.forwardRef<React.ElementRef<"img">, React.ComponentPropsWithoutRef<"img">>(
  ({ className, ...props }, ref) => (
    <img ref={ref} className={cn("aspect-square h-full w-full object-cover", className)} {...props} />
  ),
)
AvatarImage.displayName = "AvatarImage"

/* Fallback */
const AvatarFallback = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
)
AvatarFallback.displayName = "AvatarFallback"

/* Initials helper */
export const AvatarInitials = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full text-sm font-medium text-foreground",
        className,
      )}
      {...props}
    />
  ),
)
AvatarInitials.displayName = "AvatarInitials"

export { Avatar, AvatarImage, AvatarFallback }
