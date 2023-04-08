import { PrismaClient } from "@prisma/client";

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "developent") {
    global.prisma = prisma
}

export { prisma } 