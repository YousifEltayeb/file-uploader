const prisma = require("../config/prismaClient");
exports.getHome = async (req, res) => {
  if (req.user) {
    const userId = req.user.id;
    const folders = await prisma.folder.findMany({
      where: {
        userId: userId,
      },
    });
    res.render("home", { folders: folders });
  } else res.render("notLoggedIn");
};
