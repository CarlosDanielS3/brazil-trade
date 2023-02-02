/*
  Warnings:

  - A unique constraint covering the columns `[name,father_id]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categories_name_father_id_key" ON "categories"("name", "father_id");
