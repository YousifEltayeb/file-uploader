const prisma = require("../config/prismaClient");
const { authOwner } = require("../utils/authOwner");
const { validateUpdateFile, validationResult } = require("../utils/validation");

exports.getFile = [
  async (req, res, next) => {
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

exports.getUpdate = [
  async (req, res, next) => {
    await authOwner(req, res, next, { fileId: Number(req.params.fileId) });
  },
  async (req, res) => {
    const fileId = Number(req.params.fileId);
    const file = await prisma.file.findUnique({ where: { id: fileId } });
    res.render("updateFile", { file });
  },
];
exports.postUpdate = [
  async (req, res, next) => {
    await authOwner(req, res, next, { fileId: Number(req.params.fileId) });
  },
  validateUpdateFile,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("home", {
        validationError: errors.array(),
      });
    }
    const fileId = Number(req.params.fileId);
    const newTitle = req.body.title;
    await prisma.file.update({
      where: { id: fileId },
      data: { title: newTitle },
    });
    res.redirect(`/files/${fileId}`);
  },
];

exports.postDelete = [
  async (req, res, next) =>
    await authOwner(req, res, next, { fileId: Number(req.params.fileId) }),
  async (req, res) => {
    const fileId = Number(req.params.fileId);
    const file = await prisma.file.findUnique({ where: { id: fileId } });
    await prisma.file.delete({
      where: {
        id: fileId,
      },
    });
    res.redirect(`/folders/${file.folderId}`);
  },
];

exports.postDeleteAll = [
  async (req, res, next) =>
    await authOwner(req, res, next, { folderId: Number(req.params.folderId) }),
  async (req, res) => {
    const folderId = Number(req.params.folderId);
    await prisma.file.deleteMany({
      where: {
        folderId: folderId,
      },
    });
    res.redirect(`/folders/${folderId}`);
  },
];
