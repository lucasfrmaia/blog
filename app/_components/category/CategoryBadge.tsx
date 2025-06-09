import { ICategory } from "@/app/api/_services/entities/category";
import { Badge } from "../ui/badge";

export function CategoryBadge({
   category,
   className,
}: {
   category: ICategory;
   className?: string;
}) {
   return (
      <Badge
         key={category.id}
         variant="secondary"
         className={className}
         style={{
            backgroundColor: category.color,
            color: "white",
         }}
      >
         {category.name}
      </Badge>
   );
}
