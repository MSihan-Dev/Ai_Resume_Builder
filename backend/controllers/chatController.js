const Chat = require("../models/Chat");

// Save message (append to user chat)
exports.saveMessage = async (req, res) => {
  const userId = req.user._id;
  const { message } = req.body;

  let chat = await Chat.findOne({ userId });

  if (!chat) {
    chat = new Chat({ userId, messages: [] });
  }

  chat.messages.push(message);

  await chat.save();

  res.json(chat);
};

exports.getChat = async (req, res) => {
  const userId = req.user._id;

  const chat = await Chat.findOne({ userId });

  res.json(chat ? chat.messages : []);
};

// Optional: clear chat
exports.clearChat = async (req, res) => {
  const { id } = req.params;
  await Chat.findOneAndUpdate({ userId }, { messages: [] });

  res.json({ message: "Chat cleared" });
};
