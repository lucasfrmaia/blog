import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "../auth-options";
import { apiManager } from "../../_services/modules/ApiManager";

export async function POST(req: Request) {
   try {
      const session = await getServerSession(NextAuthOptions);

      if (!session?.user) {
         return NextResponse.json(
            { message: "Não autorizado" },
            { status: 401 }
         );
      }

      const { currentPassword, newPassword } = await req.json();

      const user = await apiManager.user.findById(session.user.id);

      if (!user) {
         return NextResponse.json(
            { message: "Usuário não encontrado" },
            { status: 404 }
         );
      }

      const isPasswordValid = await bcrypt.compare(
         currentPassword,
         user.password
      );

      if (!isPasswordValid) {
         return NextResponse.json(
            { message: "Senha atual incorreta" },
            { status: 400 }
         );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await apiManager.user.update({
         id: user.id,
         password: hashedPassword,
      });

      return NextResponse.json(
         { message: "Senha alterada com sucesso" },
         { status: 200 }
      );
   } catch (error) {
      console.error("Erro ao alterar senha:", error);
      return NextResponse.json(
         { message: "Erro ao alterar senha, por favor tente novamente" },
         { status: 500 }
      );
   }
}
