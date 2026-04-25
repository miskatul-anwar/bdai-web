import React from "react";
import { cn } from "../../lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  researcher,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  researcher?: string;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input p-4 glass justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="p-2 w-max bg-primary/5 rounded-xl">
            {icon}
          </div>
          {researcher && (
            <div className="text-[8px] font-black uppercase tracking-[0.2em] text-primary bg-primary/5 px-2 py-1 rounded-lg">
              {researcher}
            </div>
          )}
        </div>
        <div className="font-display font-bold text-ebony mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-ebony/60 text-xs">
          {description}
        </div>
      </div>
    </div>
  );
};
