import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const chipVariants = cva(
  "flex flex-col items-center justify-center w-fit rounded-full py-1 px-2 border-2 border-opacity-10 text-sm",
  {
    variants: {
      variant: {
        red: "bg-red-200 border-red-500 text-red-500",
        green: "bg-green-200 border-green-500 text-green-500",
        blue: "bg-blue-200 border-blue-500 text-blue-500",
        yellow: "bg-yellow-200 border-yellow-500 text-yellow-500",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  }
);

type Props = {
  title: string;
  className?: string;
} & VariantProps<typeof chipVariants>;

export default function Chips({ title, variant, className }: Props) {
  return (
    <span className={cn(chipVariants({ variant, className }))}>{title}</span>
  );
}
