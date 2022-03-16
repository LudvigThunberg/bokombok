const express = require("express");
const mongoose = require("mongoose");
const GraphicProductionModel = require("../models/GraphicProductionModel.js");
const fileUpload = require("express-fileupload");
const utils = require("../utils.js");
const fs = require("fs");
const graphicProductionRouter = express.Router();

//=== ROUTES ===

//Create image
graphicProductionRouter.post("/create", async (req, res) => {
  try {
    const image = req.files.image;
    const filename = utils.getUniqueFileName(image.name);
    const uploadPath = __dirname + "/../public/uploads/" + filename;

    await image.mv(uploadPath);

    const newImage = new GraphicProductionModel({
      artImage: "/uploads/" + filename,
      imageName: req.body.imageName,
    });

    await newImage.save();
    res.redirect("/graphicProduction");
  } catch {
    res.status(400).redirect("/graphicProduction");
  }
});

//Read
graphicProductionRouter.get("/", async (req, res) => {
  const graphicProductions = await GraphicProductionModel.find().lean();

  res.render("graphicProduction", { graphicProductions });
});

//Delete
graphicProductionRouter.post("/:id/delete", async (req, res) => {
  try {
    const id = req.params.id;
    //Remove Image File
    GraphicProductionModel.findOne({ _id: id }, (err, image) => {
      const path = __dirname + "/../public" + image.artImage;
      fs.unlinkSync(path);
    });
    //Remove From Database
    GraphicProductionModel.findOneAndDelete({ _id: id }, (err) => {});

    res.redirect("/graphicProduction");
  } catch {
    res.redirect("/graphicProduction");
  }
});

module.exports = graphicProductionRouter;
