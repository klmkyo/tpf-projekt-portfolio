import { cva } from "class-variance-authority";
import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/utils";

const textFieldLabelVariants = cva(
  "block text-[10px] font-bold uppercase tracking-[0.28em] text-[#9aa2af] sm:text-[11px] sm:tracking-[0.42em]",
);

const textFieldInputVariants = cva(
  "mt-4 w-full border-0 border-b border-[#9ca3af] bg-transparent px-0 pb-4 text-base text-[#111827] outline-none transition placeholder:text-[#c4c8d0] focus:border-[#111827] sm:mt-6 sm:text-lg",
);

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function TextField({ label, className, ...props }: TextFieldProps) {
  return (
    <label className={cn("block", className)}>
      <span className={textFieldLabelVariants()}>{label}</span>
      <input className={textFieldInputVariants()} {...props} />
    </label>
  );
}
