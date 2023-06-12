import { FC } from "react";
import { ChevronDownIcon } from "@/shared/components/icons/chevronDownIcon";

export const Status: FC = () => {
  return (
    <div className="flex justify-center items-center gap-2 cursor-pointer pt-2">
      <span className="inline-block h-2 w-2 bg-[#06d6a0] rounded-full"></span>
      <span className="text-[#797c8c] text-[12px]">Active</span>
      <ChevronDownIcon className="h-2" />
    </div>
  );
};
