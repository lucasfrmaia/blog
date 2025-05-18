import { NextRequest, NextResponse } from "next/server";
import { apiManager } from "../_services/modules/ApiManager";
import {
   IUserCreate,
   IUserUpdate,
} from "../_services/modules/user/entities/user";

export async function POST(request: NextRequest) {
   try {
      const data = (await request.json()) as IUserCreate;
      await apiManager.user.create(data);
      return NextResponse.json(
         { message: "Usuário criado com sucesso" },
         { status: 201 }
      );
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao criar usuário" },
         { status: 500 }
      );
   }
}

export async function PUT(request: NextRequest) {
   try {
      const data = (await request.json()) as IUserUpdate;
      await apiManager.user.update(data);
      return NextResponse.json({ message: "Usuário atualizado com sucesso" });
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao atualizar usuário" },
         { status: 500 }
      );
   }
}

export async function GET(request: NextRequest) {
   try {
      const { searchParams } = new URL(request.url);
      const page = searchParams.get("page");
      const limit = searchParams.get("limit");
      const email = searchParams.get("email");
      const id = searchParams.get("id");
      const roleId = searchParams.get("roleId");

      if (email) {
         const user = await apiManager.user.findByEmail(email);
         return NextResponse.json(user);
      }

      if (id) {
         const user = await apiManager.user.findById(id);
         return NextResponse.json(user);
      }

      if (roleId) {
         const users = await apiManager.user.findByRoleId(Number(roleId));
         return NextResponse.json(users);
      }

      if (page && limit) {
         const result = await apiManager.user.findPerPage(
            Number(page),
            Number(limit)
         );
         return NextResponse.json(result);
      }

      const users = await apiManager.user.findAll();
      return NextResponse.json(users);
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao buscar usuários" },
         { status: 500 }
      );
   }
}

export async function DELETE(request: NextRequest) {
   try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");

      if (!id) {
         return NextResponse.json(
            { error: "ID não fornecido" },
            { status: 400 }
         );
      }

      await apiManager.user.delete(id);
      return NextResponse.json({ message: "Usuário deletado com sucesso" });
   } catch (error) {
      return NextResponse.json(
         { error: "Erro ao deletar usuário" },
         { status: 500 }
      );
   }
}
