const prisma = require("../config/prismaClient");
const {
  validateCreateFolder,
  validationResult,
} = require("../utils/validation");
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
