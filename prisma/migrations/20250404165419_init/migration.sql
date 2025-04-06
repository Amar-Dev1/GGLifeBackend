/*
  Warnings:

  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Week` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `authorId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `authorId` to the `Week` table without a default value. This is not possible if the table is not empty.

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
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Profile_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("bio", "createdAt", "emailUpdates", "photo", "profile_id", "updatedAt") SELECT "bio", coalesce("createdAt", CURRENT_TIMESTAMP) AS "createdAt", "emailUpdates", "photo", "profile_id", "updatedAt" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_authorId_key" ON "Profile"("authorId");
CREATE TABLE "new_Task" (
    "task_id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "score" REAL NOT NULL DEFAULT 0,
    "authorId" TEXT NOT NULL,
    "weekId" TEXT NOT NULL,
    CONSTRAINT "Task_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Task_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week" ("week_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("score", "task_id", "title", "weekId") SELECT "score", "task_id", "title", "weekId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE TABLE "new_User" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isAdmin" BOOLEAN DEFAULT false
);
INSERT INTO "new_User" ("createdAt", "email", "isAdmin", "name", "password", "updatedAt", "user_id") SELECT coalesce("createdAt", CURRENT_TIMESTAMP) AS "createdAt", "email", "isAdmin", "name", "password", "updatedAt", "user_id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_user_id_idx" ON "User"("user_id");
CREATE TABLE "new_Week" (
    "week_id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "score" REAL NOT NULL DEFAULT 0,
    "authorId" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Week_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Week" ("score", "title", "week_id") SELECT "score", "title", "week_id" FROM "Week";
DROP TABLE "Week";
ALTER TABLE "new_Week" RENAME TO "Week";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
