import { apiManager } from '@/app/api/_services/ApiManager';
import { NextResponse } from 'next/server';

export async function GET() {
   try {
      const posts = await apiManager.post.findAll();
      return NextResponse.json(posts);
   } catch (error) {
      return NextResponse.json(
         { error: 'Erro ao buscar posts' },
         { status: 500 },
      );
   }
}
