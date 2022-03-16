const mongoose = require("mongoose");

const graphicProductionSchema = new mongoose.Schema({
  artImage: { type: String, required: true },
  imageName: { type: String },
});

const GraphicProductionModel = mongoose.model(
  "graphicProduction",
  graphicProductionSchema
);

module.exports = GraphicProductionModel;
