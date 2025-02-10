const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const protectRoutes = async (req, res, next) => {
  try {
    const tokken = req.cookies.tokken;
    if (!tokken) {
      return res.status(401).json({ error: "Unauthorized tokken middleware" });
    }
    const decoded = jwt.verify(tokken, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "decoded error tokken middleware" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ error: "User not found tokken middleware" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { protectRoutes };
