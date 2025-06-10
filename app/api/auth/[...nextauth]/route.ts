import NextAuth, { AuthOptions } from 'next-auth';
import { AuthUser } from '@/utils/types/auth';
import { NextAuthOptions } from '../auth-options';

const handler = NextAuth(NextAuthOptions);

export { handler as GET, handler as POST };
