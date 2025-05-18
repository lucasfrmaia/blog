import { apiManager } from "@/app/api/_services/modules/ApiManager";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const roles = await apiManager.role.findAll();
      return NextResponse.json(roles);
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao criar função: " + (error as Error)?.message },
         { status: 500 }
      );
   }
}
