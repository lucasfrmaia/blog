import { NextResponse } from 'next/server';
import { apiManager } from '../../_services/ApiManager';

export async function GET() {
   try {
      const statistics = await apiManager.post.getStatistics();
      return NextResponse.json(statistics);
   } catch (error) {
      return NextResponse.json(
         { error: 'Erro ao buscar comentário' },
         { status: 500 },
      );
   }
}
