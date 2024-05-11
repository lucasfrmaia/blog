import { prisma } from "@/prisma/client/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   try {
      const categories = await prisma.category.findMany();

      return NextResponse.json({ categories }, { status: 200 });
   } catch (err) {
      return NextResponse.json(
         { message: "Something went wrong!" },
         { status: 500 }
      );
   }
}
