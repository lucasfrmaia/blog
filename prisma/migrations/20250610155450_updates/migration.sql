/*
  Warnings:

  - Added the required column `type` to the `LikeComment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LikeComment" (
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    PRIMARY KEY ("commentId", "userId"),
    CONSTRAINT "LikeComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LikeComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LikeComment" ("commentId", "userId") SELECT "commentId", "userId" FROM "LikeComment";
DROP TABLE "LikeComment";
ALTER TABLE "new_LikeComment" RENAME TO "LikeComment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
