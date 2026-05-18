import { cn } from "../lib/utils";

type LoadingStateProps = {
  className?: string;
};

export default function LoadingState({ className }: LoadingStateProps) {
  return (
    <div className={cn("flex w-full items-center justify-center px-5 py-16 sm:px-12 sm:py-24 lg:px-24", className)}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d4d7de] bg-white/70 shadow-sm">
        <div
          aria-hidden="true"
          className="h-10 w-10 rounded-full border-2 border-transparent border-t-[#111827] border-r-[#111827] animate-spin"
        />
      </div>
    </div>
  );
}
