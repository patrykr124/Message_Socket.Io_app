const User = require("../models/user.model");
const Message = require("../models/message.model");
const cloudinary = require("../lib/cloudinary");
const { getReceiverSocketId } = require("../lib/socket.io/socket");
const { io } = require("../lib/socket.io/socket");
//pobieramy wszystkich  użytkowników
const getUsersForSidebar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;

    const filteredUser = await User.find({ _id: { $ne: loggedUserId } }).select(
      "-password"
    );
    res.status(200).json(filteredUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error in getMessages controller",
      message: error.message,
    });
  }
};

const lastMessage = async (req, res) => {
  try {
    // zalogowany użytkownik poprzed middleware - req pochodzi z jwt
    const userId = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    const userWithLastMessage = await Promise.all(
      filteredUser.map(async (user) => {
        const lastMessage = await Message.findOne({
          $or: [
            { senderId: userId, receiverId: user._id },
            { senderId: user._id, receiverId: userId },
          ],
        }).sort({ createdAt: -1 });
        return {
          ...user.toObject(),
          lastMessage: lastMessage ? lastMessage.text : "No messages yet",
        };
      })
    );
    res.status(200).json(userWithLastMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "error in lastMessage router", error: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    let imgUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imgUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId: myId,
      receiverId: userToChatId,
      text,
      image: imgUrl,
    });
    await newMessage.save();

    // realtime functionality socket !!!

    const receiverSocketId = getReceiverSocketId(userToChatId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error in sendMessage controller", error.message);
  }
};

module.exports = { getUsersForSidebar, getMessage, sendMessage,lastMessage };
