/*
  Warnings:

  - You are about to drop the `LikePost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LikePost";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "LikeComment" (
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("commentId", "userId"),
    CONSTRAINT "LikeComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LikeComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
