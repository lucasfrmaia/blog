import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
   params: {
      name: string;
   };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
   try {
      const { name } = params;
      const role = await apiManager.role.findByName(name);

      if (!role) {
         return NextResponse.json(
            { error: "Função não encontrada" },
            { status: 404 }
         );
      }

      return NextResponse.json(role);
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao buscar função por nome" },
         { status: 500 }
      );
   }
}
