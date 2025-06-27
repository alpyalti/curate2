import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-black text-white hover:bg-gray-800",
        secondary:
          "border-transparent bg-black text-white hover:bg-gray-800",
        destructive:
          "border-transparent bg-black text-white hover:bg-gray-800",
        outline: "border-black text-black hover:bg-gray-100",
        "new-season": "border-transparent bg-black text-white hover:bg-gray-800",
        sale: "border-transparent bg-black text-white hover:bg-gray-800",
        exclusive: "border-transparent bg-black text-white hover:bg-gray-800",
        "low-stock": "border-transparent bg-black text-white hover:bg-gray-800",
        "further-reduction": "border-transparent bg-black text-white hover:bg-gray-800",
        bestseller: "border-transparent bg-black text-white hover:bg-gray-800",
        new: "border-transparent bg-black text-white hover:bg-gray-800",
        trending: "border-transparent bg-black text-white hover:bg-gray-800",
        "in-stock": "border-transparent bg-green-600 text-white hover:bg-green-700",
        "low-stock-warning": "border-transparent bg-red-600 text-white hover:bg-red-700",
        "out-of-stock": "border-transparent bg-red-600 text-white hover:bg-red-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants }; 