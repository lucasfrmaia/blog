import React from "react";

type IPropFooter = {
   children?: React.ReactNode;
   className?: string;
};

export default function Footer({ children, className }: IPropFooter) {
   return <footer></footer>;
}
