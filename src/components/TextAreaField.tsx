import { cva } from "class-variance-authority";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "../lib/utils";

const textAreaLabelVariants = cva(
  "block text-[10px] font-bold uppercase tracking-[0.28em] text-[#9aa2af] sm:text-[11px] sm:tracking-[0.42em]",
);

const textAreaVariants = cva(
  "mt-4 min-h-32 w-full resize-y border-0 border-b border-[#9ca3af] bg-transparent px-0 pb-4 text-base text-[#111827] outline-none transition placeholder:text-[#c4c8d0] focus:border-[#111827] sm:mt-6 sm:text-lg",
);

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export default function TextAreaField({ label, className, ...props }: TextAreaFieldProps) {
  return (
    <label className={cn("block", className)}>
      <span className={textAreaLabelVariants()}>{label}</span>
      <textarea className={textAreaVariants()} {...props} />
    </label>
  );
}
