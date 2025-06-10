import { apiManager } from '@/app/api/_services/ApiManager';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
   params: {
      userId: string;
   };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
   try {
      const { userId } = params;
      const role = await apiManager.role.findByUserId(userId);

      if (!role) {
         return NextResponse.json(
            { error: 'Função não encontrada para o usuário' },
            { status: 404 },
         );
      }

      return NextResponse.json(role);
   } catch (error) {
      return NextResponse.json(
         { error: 'Erro ao buscar função do usuário' },
         { status: 500 },
      );
   }
}
