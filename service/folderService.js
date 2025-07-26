const prisma = require("../config/prismaClient");

class Folder {
  async findAllById(id) {
    const folders = await prisma.user.findMany({
      where: {
        id: id,
      },
    });
    return folders;
  }
}
module.exports = new Folder();
