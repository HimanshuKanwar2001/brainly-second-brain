import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["images", "video", "article", "audio"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tagsId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tags",
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Content = mongoose.model("Content", contentSchema);

export default Content;
