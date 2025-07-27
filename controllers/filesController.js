const prisma = require("../config/prismaClient");
const { authOwner } = require("../utils/authOwner");
const { validateUpdateFile, validationResult } = require("../utils/validation");

exports.getFile = [
  async (req, res, next) => {
    console.log(req.params.fileId);
    await authOwner(req, res, next, { fileId: Number(req.params.fileId) });
  },
  async (req, res) => {
    const fileId = Number(req.params.fileId);
    const file = await prisma.file.findUnique({
      where: { id: fileId },
      include: { folder: true },
    });
    res.render("file", { file });
  },
];
