const mongoose = require("mongoose");

const graphicDesignSchema = new mongoose.Schema({
  artImage: { type: String, required: true },
  imageName: { type: String },
});

const GraphicDesignModel = mongoose.model("graphicDesign", graphicDesignSchema);

module.exports = GraphicDesignModel;
