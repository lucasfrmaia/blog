import { apiManager } from '@/app/api/_services/ApiManager';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
   params: {
      id: string;
   };
}

// Buscar função por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
   try {
      const { id } = params;
      const role = await apiManager.role.findById(Number(id));

      if (!role) {
         return NextResponse.json(
            { error: 'Função não encontrada' },
            { status: 404 },
         );
      }

      return NextResponse.json(role);
   } catch (error) {
      return NextResponse.json(
         { error: 'Erro ao buscar função' },
         { status: 500 },
      );
   }
}

// Atualizar função
export async function PUT(request: NextRequest, { params }: RouteParams) {
   try {
      const { id } = params;
      const body = await request.json();

      // Verificar se os campos obrigatórios estão presentes
      if (!body.name || !body.description) {
         return NextResponse.json(
            { error: 'Nome e descrição são campos obrigatórios' },
            { status: 400 },
         );
      }

      await apiManager.role.update({
         id: parseInt(id),
         name: body.name,
         description: body.description,
      });

      return NextResponse.json(
         { message: 'Role atualizada com sucesso' },
         { status: 200 },
      );
   } catch (error) {
      return NextResponse.json(
         { error: 'Erro ao atualizar role' },
         { status: 500 },
      );
   }
}

// Excluir função
export async function DELETE(request: NextRequest, { params }: RouteParams) {
   try {
      const { id } = params;
      await apiManager.role.delete(Number(id));

      return NextResponse.json({ message: 'Função excluída com sucesso' });
   } catch (error) {
      return NextResponse.json(
         { error: 'Erro ao excluir função' },
         { status: 500 },
      );
   }
}
