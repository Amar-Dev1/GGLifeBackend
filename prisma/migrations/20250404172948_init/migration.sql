/*
  Warnings:

  - You are about to drop the column `authorId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Week` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Week` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "profile_id" TEXT NOT NULL PRIMARY KEY,
    "bio" TEXT,
    "photo" BLOB,
    "emailUpdates" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("bio", "createdAt", "emailUpdates", "photo", "profile_id", "updatedAt") SELECT "bio", "createdAt", "emailUpdates", "photo", "profile_id", "updatedAt" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
CREATE TABLE "new_Task" (
    "task_id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "score" REAL NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "weekId" TEXT NOT NULL,
    CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Task_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week" ("week_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("score", "task_id", "title", "weekId") SELECT "score", "task_id", "title", "weekId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE TABLE "new_Week" (
    "week_id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "score" REAL NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Week_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Week" ("createdAt", "score", "title", "week_id") SELECT "createdAt", "score", "title", "week_id" FROM "Week";
DROP TABLE "Week";
ALTER TABLE "new_Week" RENAME TO "Week";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
