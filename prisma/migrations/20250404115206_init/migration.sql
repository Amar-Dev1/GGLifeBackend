-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "task_id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "score" REAL NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "weekId" TEXT NOT NULL,
    CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Task_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week" ("week_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("score", "task_id", "title", "userId", "weekId") SELECT "score", "task_id", "title", "userId", "weekId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE TABLE "new_User" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "photo" BLOB,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "isAdmin" BOOLEAN DEFAULT false
);
INSERT INTO "new_User" ("createdAt", "email", "isAdmin", "name", "password", "photo", "updatedAt", "user_id") SELECT "createdAt", "email", "isAdmin", "name", "password", "photo", "updatedAt", "user_id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Week" (
    "week_id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "score" REAL NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Week_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Week" ("score", "title", "userId", "week_id") SELECT "score", "title", "userId", "week_id" FROM "Week";
DROP TABLE "Week";
ALTER TABLE "new_Week" RENAME TO "Week";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
