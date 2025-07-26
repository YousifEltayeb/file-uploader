const prisma = require("../config/prismaClient");
const {
  validateCreateFolder,
  validationResult,
} = require("../utils/validation");
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
  upload.single("file"),
  async (req, res) => {
    const folderId = Number(req.params.folderId);
    const userId = req.user.id;
    const foldersList = await prisma.folder.findMany({ where: { userId } });
    console.log("userId", userId);
    console.log("folder list", foldersList);
    const foundFolder = foldersList.find((folder) => folder.id === folderId);
    if (foundFolder) {
      const title = req.file.originalname;
      const size = req.file.size;
      // to be changed
      const url = req.file.path;
      await prisma.file.create({
        data: {
          title,
          url,
          size,
          folderId,
          userId,
        },
      });
      res.redirect(`/folders/${folderId}`);
    } else {
      res.send("this ain't your forlder dawg");
    }
  },
];
