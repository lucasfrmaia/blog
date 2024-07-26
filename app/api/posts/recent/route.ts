import { prisma } from "@/prisma/client/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   try {
      const posts = Array.from({ length: 5 }).map((x) => ({
         id: "1",
         createdAt: new Date(),
         updateAt: new Date(),
         slug: "post-1",
         title: "Post 1",
         description: "Description of post 1",
         img: "https://t3.ftcdn.net/jpg/05/27/49/44/360_F_527494416_7PWpMBqkWQarxhOgD1vIDzhDxizP1cQd.jpg",
         views: 100,
         catSlug: "technology",
         userEmail: "user1@example.com",
         categories: [
            {
               id: "2",
               slug: "science",
               title: "Ciência",
               color: "#007bff",
            },
         ],
      }));

      return NextResponse.json({ posts }, { status: 200 });
   } catch (err) {
      return NextResponse.json(
         { message: "Something went wrong!" },
         { status: 500 }
      );
   }
}
