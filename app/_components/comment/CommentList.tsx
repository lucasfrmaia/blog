import { IComment } from "@/app/api/_services/modules/comment/entities/comment";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface CommentListProps {
   comments: IComment[];
}

export function CommentList({ comments }: CommentListProps) {
   return (
      <div className="space-y-4">
         {comments.map((comment) => (
            <Card key={comment.id}>
               <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                     <Avatar>
                        <AvatarImage
                           src={"/placeholder-avatar.jpg"}
                           alt={comment.user?.name || ""}
                        />
                        <AvatarFallback>
                           {comment.user?.name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase() || "U"}
                        </AvatarFallback>
                     </Avatar>
                     <div className="flex-1">
                        <div className="flex items-center justify-between">
                           <p className="font-medium">{comment.user?.name}</p>
                           <p className="text-sm text-muted-foreground">
                              {formatDistanceToNow(
                                 new Date(comment.createdAt),
                                 {
                                    addSuffix: true,
                                    locale: ptBR,
                                 }
                              )}
                           </p>
                        </div>
                        <p className="mt-2">{comment.content}</p>
                     </div>
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>
   );
}
