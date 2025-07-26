const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.send("hellloooooo");
});

module.exports = indexRouter;
