exports.getHome = async (req, res) => {
  if (req.user) {
    const id = req.user.id;
    const folders = await prisma.user.findMany({
      where: {
        id: id,
      },
    });
    res.render("home", { folders: folders });
  } else res.render("notLoggedIn");
};
