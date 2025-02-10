const express = require("express");
const {
  signUp,
  login,
  logout,
  update,
  checkAuth,
} = require("../controllers/auth.controller");
const { protectRoutes } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update", protectRoutes, update);
router.get("/check", protectRoutes, checkAuth);

module.exports = router;
