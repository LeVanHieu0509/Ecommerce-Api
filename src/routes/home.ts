const router = require("express").Router();

// Get all users
router.get("/", (req, res, next) => {
  res.status(500).json({
    message: "Welcome Fantipjs",
  });
});

export default router;
