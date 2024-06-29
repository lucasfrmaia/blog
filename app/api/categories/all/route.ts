import { prisma } from "@/prisma/client/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   try {
      const categories = Array.from({ length: 5 }).map(() => ({
         id: "2",
         slug: "science",
         title: "Science",
         color: "#007bff",
      }));

      return NextResponse.json({ categories }, { status: 200 });
   } catch (err) {
      return NextResponse.json(
         { message: "Something went wrong!" },
         { status: 500 }
      );
   }
}
