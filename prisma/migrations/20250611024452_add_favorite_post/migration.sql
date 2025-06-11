/*
  Warnings:

  - You are about to drop the `_favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_favorites";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "FavoritePost" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "postId"),
    CONSTRAINT "FavoritePost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FavoritePost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
