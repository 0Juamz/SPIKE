-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
