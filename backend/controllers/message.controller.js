const User = require("../models/user.model");
const Message = require("../models/message.model");
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
    res.status(500).json("Error in getMessages controller", error.message);
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

    res.status(200).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error in sendMessage controller", error.message);
  }
};

module.exports = { getUsersForSidebar, getMessage, sendMessage };
