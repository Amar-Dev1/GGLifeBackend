/*
  Warnings:

  - You are about to drop the column `id` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Week` table. All the data in the column will be lost.
  - The required column `task_id` was added to the `Task` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - The required column `user_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `Week` table without a default value. This is not possible if the table is not empty.
  - The required column `week_id` was added to the `Week` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "task_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "score" REAL NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "weekId" TEXT NOT NULL,
    CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Task_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week" ("week_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("score", "title") SELECT "score", "title" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE UNIQUE INDEX "Task_task_id_key" ON "Task"("task_id");
CREATE TABLE "new_User" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "photo" BLOB,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_User" ("createdAt", "email", "name", "password", "photo", "updatedAt") SELECT "createdAt", "email", "name", "password", "photo", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Week" (
    "week_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Week_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Week" ("score", "title") SELECT "score", "title" FROM "Week";
DROP TABLE "Week";
ALTER TABLE "new_Week" RENAME TO "Week";
CREATE UNIQUE INDEX "Week_week_id_key" ON "Week"("week_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
