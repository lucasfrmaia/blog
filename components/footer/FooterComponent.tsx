import { cn } from "@/lib/utils";
import React from "react";

interface FooterContentProps {
   className?: string;
   children: React.ReactNode;
}

interface FooterUlProps {
   className?: string;
   children: React.ReactNode;
}

interface FooterLinkProps {
   href: string;
   className?: string;
   children: React.ReactNode;
}

interface FooterTextProps {
   className?: string;
   children: React.ReactNode;
}

interface FooterLiProps {
   className?: string;
   children: React.ReactNode;
}

interface FooterTitleProps {
   className?: string;
   children: React.ReactNode;
}

export const FooterContent: React.FC<FooterContentProps> = ({
   className,
   children,
}) => {
   return <div className={cn(`p-4`, className)}>{children}</div>;
};

export const FooterUl: React.FC<FooterUlProps> = ({ className, children }) => {
   return <ul className={cn(`p-4 list-disc`, className)}>{children}</ul>;
};

export const FooterLi: React.FC<FooterLiProps> = ({ className, children }) => {
   return <li className={cn(`text-gray-600`, className)}>{children}</li>;
};

export const FooterLink: React.FC<FooterLinkProps> = ({
   href,
   className,
   children,
}) => {
   return (
      <a href={href} className={cn(`text-blue-500 hover:underline`, className)}>
         {children}
      </a>
   );
};

export const FooterText: React.FC<FooterTextProps> = ({
   className,
   children,
}) => {
   return <p className={cn(`text-gray-600`, className)}>{children}</p>;
};

export const FooterTitle: React.FC<FooterTitleProps> = ({
   className,
   children,
}) => {
   return <h3 className={cn(`text-lg font-bold`, className)}>{children}</h3>;
};
