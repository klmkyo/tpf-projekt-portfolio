import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center rounded-xl px-5 text-center text-[10px] font-extrabold uppercase tracking-[0.16em] transition disabled:pointer-events-none disabled:opacity-50 sm:px-7 sm:text-[11px] sm:tracking-[0.28em]",
  {
    variants: {
      variant: {
        primary: "bg-[#ca171d] text-white hover:bg-[#a91419]",
        dark: "bg-[#111827] text-white hover:bg-black",
        ghost: "bg-transparent text-[#111827] hover:text-[#ca171d]",
        outline:
          "border border-[#9ca3af] bg-transparent text-[#111827] hover:border-[#111827]",
      },
    },
    defaultVariants: {
      variant: "dark",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
  children: ReactNode;
};

export default function Button({ children, className, variant, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props}>
      {children}
    </button>
  );
}
