import { NextRequest, NextResponse } from 'next/server';
import { apiManager } from '../../_services/ApiManager';

export async function POST(request: NextRequest) {
   try {
      const { email, password } = await request.json();

      if (!email || !password) {
         return NextResponse.json(
            { error: 'Email e senha são obrigatórios' },
            { status: 400 },
         );
      }

      const user = await apiManager.user.authenticate(email, password);
      return NextResponse.json(user);
   } catch (error) {
      return NextResponse.json(
         { error: 'Credenciais inválidas' },
         { status: 401 },
      );
   }
}
