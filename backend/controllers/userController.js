const User = require("../models/User");

// GET PROFILE
exports.getProfile = async (req, res) => {
  res.json(req.user);
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
  });
};
