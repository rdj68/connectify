import mongoose from "mongoose";

const messagesSchema = mongoose.Schema({
  // userNames: {
  //   type: Array,
  //   required: true,
  // },
  id: {
    type: Array,
    required: true,
  },
  messages: {
    type: Array,
  },
});
const Messages = mongoose.model("MessagesConnectify", messagesSchema);
export default Messages;
