import { cva } from "class-variance-authority";
import type { SelectHTMLAttributes } from "react";
import { cn } from "../lib/utils";

const selectLabelVariants = cva(
  "block text-[10px] font-bold uppercase tracking-[0.28em] text-[#9aa2af] sm:text-[11px] sm:tracking-[0.42em]",
);

const selectVariants = cva(
  "mt-4 w-full rounded-none border-0 border-b border-[#9ca3af] bg-transparent px-0 pb-4 text-base text-[#111827] outline-none transition focus:border-[#111827] sm:mt-6 sm:text-lg",
);

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
};

export default function SelectField({ label, className, children, ...props }: SelectFieldProps) {
  return (
    <label className={cn("block", className)}>
      <span className={selectLabelVariants()}>{label}</span>
      <select className={selectVariants()} {...props}>
        {children}
      </select>
    </label>
  );
}
