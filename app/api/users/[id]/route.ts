import { NextResponse, NextRequest } from "next/server";
import { apiManager } from "../../_services/ApiManager";

interface RouteParams {
   params: {
      id: string;
   };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
   try {
      const { id } = params;

      if (id) {
         const user = await apiManager.user.findById(id);
         return NextResponse.json(user);
      }
   } catch (error) {
      return NextResponse.json({
         error: "Erro ao atualizar o usuário: " + (error as Error).message,
         status: 500,
      });
   }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
   try {
      const { id } = params;
      const body = await req.json();

      await apiManager.user.update({
         id: id,
         name: body.name,
         email: body.email,
         roleId: Number(body.role),
      });

      return NextResponse.json({ message: "Sucesso ao atualizar o usuário" });
   } catch (error) {
      return NextResponse.json({
         error: "Erro ao atualizar o usuário: " + (error as Error).message,
         status: 500,
      });
   }
}
