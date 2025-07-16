import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export class BaseRepository {
   protected userSelectProps: {
      select: Prisma.UserSelect<DefaultArgs> | null | undefined;
   } = {
      select: {
         name: true,
         avatar: true,
      },
   };
}
