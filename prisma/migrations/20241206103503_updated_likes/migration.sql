-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subject" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("createdAt", "detail", "id", "likes", "subject", "updatedAt", "userId") SELECT "createdAt", "detail", "id", "likes", "subject", "updatedAt", "userId" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE TABLE "new_Reply" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "detail" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "postId" INTEGER,
    CONSTRAINT "Reply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reply_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Reply" ("createdAt", "detail", "id", "likes", "postId", "updatedAt", "userId") SELECT "createdAt", "detail", "id", "likes", "postId", "updatedAt", "userId" FROM "Reply";
DROP TABLE "Reply";
ALTER TABLE "new_Reply" RENAME TO "Reply";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
