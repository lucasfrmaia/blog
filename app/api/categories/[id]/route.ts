import { apiManager } from '@/app/api/_services/ApiManager';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
   params: {
      id: string;
   };
}

// Buscar categoria por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
   try {
      const { id } = params;
      const category = await apiManager.category.findById(id);

      if (!category) {
         return NextResponse.json(
            { error: 'Categoria não encontrada' },
            { status: 404 },
         );
      }

      return NextResponse.json(category);
   } catch (error) {
      return NextResponse.json(
         { error: 'Erro ao buscar categoria' },
         { status: 500 },
      );
   }
}

// Atualizar categoria
export async function PATCH(request: NextRequest, { params }: RouteParams) {
   try {
      const { id } = params;
      const body = await request.json();

      await apiManager.category.update({
         id,
         ...body,
      });

      return NextResponse.json({ message: 'Categoria atualizada com sucesso' });
   } catch (error) {
      return NextResponse.json(
         { error: 'Erro ao atualizar categoria' },
         { status: 500 },
      );
   }
}

// Excluir categoria
export async function DELETE(request: NextRequest, { params }: RouteParams) {
   try {
      const { id } = params;
      await apiManager.category.delete(id);

      return NextResponse.json({ message: 'Categoria excluída com sucesso' });
   } catch (error) {
      return NextResponse.json(
         { error: 'Erro ao excluir categoria' },
         { status: 500 },
      );
   }
}
