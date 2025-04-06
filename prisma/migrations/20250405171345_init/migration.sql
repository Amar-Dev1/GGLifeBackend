-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "task_id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "score" REAL NOT NULL DEFAULT 0.0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "weekId" TEXT NOT NULL,
    CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Task_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week" ("week_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("score", "task_id", "title", "userId", "weekId") SELECT "score", "task_id", "title", "userId", "weekId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE TABLE "new_Week" (
    "week_id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "score" REAL NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Week_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Week" ("createdAt", "score", "title", "userId", "week_id") SELECT "createdAt", "score", "title", "userId", "week_id" FROM "Week";
DROP TABLE "Week";
ALTER TABLE "new_Week" RENAME TO "Week";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
