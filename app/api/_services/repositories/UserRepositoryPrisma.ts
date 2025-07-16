import { Prisma, User } from '@prisma/client';
import { IUser, IUserCreate, IUserUpdate } from '../entities/user';
import { hash, compare, genSalt } from 'bcryptjs';
import { prisma } from '../../../../prisma/lib/prisma';
import { IUserRepository } from '../interfaces/UserRepository';
import { BaseRepository } from './BaseRepository';

export class UserRepositoryPrisma
   extends BaseRepository
   implements IUserRepository
{
   async findById(id: string): Promise<IUser | null> {
      const user = await prisma.user.findUnique({
         where: { id },
         include: { role: true, posts: true, comments: true },
      });
      return user as User;
   }

   async findAll(): Promise<IUser[]> {
      const users = await prisma.user.findMany({
         include: { role: true, posts: true, comments: true },
      });
      return users as User[];
   }

   async findPerPage(
      page: number,
      limit: number,
   ): Promise<{ users: IUser[]; total: number }> {
      const [users, total] = await Promise.all([
         prisma.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: { role: true, posts: true, comments: true },
            orderBy: { createdAt: 'desc' },
         }),
         prisma.user.count(),
      ]);

      return { users: users as User[], total };
   }

   async create(data: IUserCreate): Promise<IUser> {
      const salt = await genSalt(10);
      const passwordString =
         typeof data.password === 'string' ? data.password : '';
      if (!passwordString) {
         throw new Error('Senha é obrigatória.');
      }
      const hashedPassword = await hash(passwordString, salt);

      const roleId = data.roleId;

      if (!roleId) {
         throw new Error(
            "Role ID é obrigatório via 'role: { connect: { id: ... } }'",
         );
      }

      return await prisma.user.create({
         data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            salt,
            roleId: roleId,
         },
         include: { role: true },
      });
   }

   async authenticate(email: string, password: string): Promise<IUser> {
      const user = await prisma.user.findUnique({
         where: { email: email },
         include: { role: true },
      });

      if (!user) {
         throw new Error('Usuário não encontrado');
      }

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) {
         throw new Error('Senha incorreta');
      }

      return user as User;
   }

   async findByEmail(email: string): Promise<IUser | null> {
      const user = await prisma.user.findUnique({
         where: { email },
         include: { role: true, posts: true, comments: true },
      });
      return user as User;
   }

   async findByRoleId(roleId: number): Promise<IUser[]> {
      const users = await prisma.user.findMany({
         where: { roleId },
         include: { role: true, posts: true, comments: true },
      });
      return users as User[];
   }

   async update(userPayload: IUserUpdate): Promise<void> {
      await prisma.user.update({
         where: { id: userPayload.id },
         data: {
            email: userPayload?.email,
            name: userPayload?.name,
            password: userPayload?.password,
         },
      });
   }

   async delete(id: string): Promise<void> {
      await prisma.$transaction(async (tx) => {
         await tx.comment.deleteMany({ where: { userId: id } });
         await tx.post.deleteMany({ where: { authorId: id } });
         await tx.user.delete({ where: { id } });
      });
   }
}
