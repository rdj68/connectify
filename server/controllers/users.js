import User from "../models/User.js";
import Messages from "../models/messages.js";

//Read
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getConnections = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const connections = await Promise.all(
      user.connections.map((id) => User.findById(id))
    );
    const formatedConnections = connections.map(
      ({ _id, userName, email, bio, location, picturePath }) => {
        return { _id, userName, email, bio, location, picturePath };
      }
    );
    res.status(200).json(formatedConnections);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addConnection = async (req, res) => {
  try {
    const { id, connectionId } = req.params;

    const user = await User.findById(id);
    const connection = await User.findById(connectionId);

    if (user.connections.includes(connectionId)) {
      // user.connections = user.connections.filter((id) => id !== connectionId);
      // connection.connections = connection.connections.filter((id) => id !== id);
    } else {
      user.connections.push(connectionId);
      connection.connections.push(id);
    }
    await user.save();
    await connection.save();

    const connections = await Promise.all(
      user.connections.map((id) => User.findById(id))
    );
    const formatedConnections = connections.map(
      ({ userName, email, bio, location }) => {
        return { userName, email, bio, location };
      }
    );
    res.status(200).json(formatedConnections);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const search = async (req, res) => {
  try {
    const searchKey = req.header("Search");
    const user = await User.find({
      fieldOfIntrest: { $all: [searchKey] },
      isCompany: false,
    });

    const formatedUser = user.map(
      ({
        _id,
        userName,
        email,
        bio,
        location,
        picturePath,
        fieldOfIntrest,
        skills,
      }) => {
        return {
          _id,
          userName,
          email,
          bio,
          location,
          picturePath,
          fieldOfIntrest,
          skills,
        };
      }
    );
    res.status(200).json(formatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const putMessage = async (req, res) => {
  try {
    const { id, connectionId } = req.params;
    const newMessage = req.header("Message");
    var chat = await Messages.findOne({ id: { $all: [id, connectionId] } });

    if (!chat) {
      const newChat = new Messages({
        id: [id, connectionId],
        messages: [{ id: id, message: newMessage }],
      });
      chat = await newChat.save();
    } else {
      chat.messages.push({ id: id, message: newMessage });
      await chat.save();
    }

    res.status(200).json(chat.messages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id, connectionId } = req.params;
    var chat = await Messages.findOne({ id: { $all: [id, connectionId] } });

    if (!chat) {
      chat = [];
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
