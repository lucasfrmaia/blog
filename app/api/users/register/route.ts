import { NextResponse } from "next/server";
import { apiManager } from "../../_services/ApiManager";

export async function POST(request: Request) {
   try {
      const body = await request.json();
      const { name, email, password } = body;

      if (!name || !email || !password) {
         return NextResponse.json(
            { error: "Dados inválidos" },
            { status: 400 }
         );
      }

      const existingUser = await apiManager.user.findByEmail(email);

      if (existingUser != null) {
         return NextResponse.json(
            { error: "Email já cadastrado" },
            { status: 400 }
         );
      }

      await apiManager.user.create({
         name,
         email,
         password,
         roleId: 2,
      });

      return NextResponse.json(
         { message: "Usuário criado com sucesso" },
         { status: 201 }
      );
   } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return NextResponse.json(
         { error: "Erro ao criar usuário" },
         { status: 500 }
      );
   }
}
