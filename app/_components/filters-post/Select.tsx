import React from "react";
import { cn } from "@/lib/utils";
import { TTypeSort } from "@/utils/types/UtilsTypes";

type ISelectProps = {
   children?: React.ReactNode;
   className?: string;
};

export const SelectContainer = ({ children, className }: ISelectProps) => {
   return <div className={cn("", className)}>{children}</div>;
};

export const SelectTitle = ({ children, className }: ISelectProps) => {
   return <h3 className={cn("", className)}>{children}</h3>;
};

export type TSortOptions = {
   options: { label: TTypeSort; value: string }[];
};
