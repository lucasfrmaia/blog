import { prisma } from "../../../prisma/client/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   const { searchParams } = new URL(req.url);

   const postSlug = searchParams.get("postSlug");

   try {
      const comments = await prisma.comment.findMany({
         where: {
            ...(postSlug && { postSlug }),
         },
         include: { user: true },
      });

      return NextResponse.json({ comments: comments }, { status: 200 });
   } catch (err) {
      return NextResponse.json(
         { message: "Something went wrong!" },
         { status: 500 }
      );
   }
}
