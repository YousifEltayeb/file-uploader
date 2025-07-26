const prisma = require("../config/prismaClient");

class User {
  async create(email, password) {
    await prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }
  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }

  async findById(id) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }
}

module.exports = new User();
