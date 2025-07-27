const prisma = require("../config/prismaClient");
const {
  validateCreateFolder,
  validationResult,
  validateUpdateFolder,
} = require("../utils/validation");
const { authOwner } = require("../utils/authOwner");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// 5 mb limit and 1 file
const upload = multer({
  storage: storage,
  limits: { files: 1, fileSize: 5242880 },
});

exports.postCreate = [
  validateCreateFolder,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("home", {
        validationError: errors.array(),
      });
    }

    if (req.user) {
      const userId = req.user.id;
      const { title } = req.body;
      await prisma.folder.create({ data: { title, userId } });

      res.redirect("/");
    } else {
      res.redirect("/signup");
    }
  },
];

exports.getRead = async (req, res) => {
  if (req.user) {
    const userId = req.user.id;
    const folderId = Number(req.params.folderId);
    const files = await prisma.file.findMany({
      where: { userId, folderId },
    });
    res.render("files", { files, folderId });
  } else res.redirect("signup");
};

exports.postUploadFile = [
  async (req, res, next) => {
    authOwner(req, res, next, { folderId: Number(req.params.folderId) });
  },
  upload.single("file"),
  async (req, res) => {
    const { originalname: title, size, path: url } = req.file;
    const folderId = Number(req.params.folderId);
    await prisma.file.create({
      data: {
        title,
        url,
        size,
        folderId,
        userId: req.user.id,
      },
    });
    res.redirect(`/folders/${folderId}`);
  },
];

exports.getUpdate = async (req, res) => {
  const folderId = Number(req.params.folderId);
  const folder = await prisma.folder.findUnique({ where: { id: folderId } });
  res.render("updateFolder", { folder });
};
exports.postUpdate = [
  async (req, res, next) =>
    await authOwner(req, res, next, { folderId: Number(req.params.folderId) }),
  validateUpdateFolder,
  async (req, res) => {
    const folderId = Number(req.params.folderId);
    const newTitle = req.body.title;
    await prisma.folder.update({
      where: { id: folderId },
      data: { title: newTitle },
    });
    res.redirect("/");
  },
];

exports.postDelete = [
  async (req, res, next) => {
    await authOwner(req, res, next, { folderId: Number(req.params.folderId) });
  },
  async (req, res) => {
    const folderId = Number(req.params.folderId);
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
      include: { files: true },
    });
    if (folder.files.length > 0) {
      return res.send("you can only delete a folder it doesnt have files");
    }

    await prisma.folder.delete({ where: { id: folderId } });
    res.redirect("/");
  },
];
