const mongoose = require("mongoose");

const artSchema = new mongoose.Schema({
  artImage: { type: String, required: true },
  imageName: { type: String },
});

const ArtModel = mongoose.model("art", artSchema);

module.exports = ArtModel;
