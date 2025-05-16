import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const categories = await apiManager.category.findAll();
      return NextResponse.json(categories);
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao buscar categorias" },
         { status: 500 }
      );
   }
}
