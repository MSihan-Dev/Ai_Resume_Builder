const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [
      {
        role: String, // "user" or "bot"
        text: String,
        time: String,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Chat", chatSchema);
