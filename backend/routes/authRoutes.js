const express = require("express");
const router = express.Router();

const { loginUser, registerUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;

// const express = require("express");
// const router = express.Router();

// // temporary test (no controller yet)
// router.post("/login", (req, res) => {
//   res.json({ message: "LOGIN WORKING" });
// });

// router.post("/register", (req, res) => {
//   res.json({ message: "REGISTER WORKING" });
// });

// module.exports = router;
