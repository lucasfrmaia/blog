import React from "react";

interface Category {
   name: string;
}

export function PostContainer({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return <div className="post-container">{children}</div>;
}

export function PostImage({
   src,
   alt,
   className,
}: {
   src: string;
   alt: string;
   className?: string;
}) {
   return <img className="post-image" src={src} alt={alt} />;
}

export function PostTitle({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return <h2 className="post-title">{children}</h2>;
}

export function PostDescription({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return <p className="post-description">{children}</p>;
}

export function ReadMoreButton({
   onClick,
}: {
   onClick: () => void;
   className?: string;
}) {
   return (
      <button className="read-more-button" onClick={onClick}>
         Read More
      </button>
   );
}

export function PostContent({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return <div className="post-container">{children}</div>;
}

export function PostCategories({
   categories,
   className,
}: {
   categories: Category[];
   className?: string;
}) {
   return (
      <ul className="post-categories">
         {categories.map((category, index) => (
            <li key={index} className="post-category">
               {category.name}
            </li>
         ))}
      </ul>
   );
}
