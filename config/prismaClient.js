const { PrismaClient } = require("../generated/prisma");

let prisma = new PrismaClient();

module.exports = prisma;
