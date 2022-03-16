const express = require("express");
const mongoose = require("mongoose");
const GraphicDesignModel = require("../models/GraphicDesignModel.js");
const fileUpload = require("express-fileupload");
const utils = require("../utils.js");
const fs = require("fs");
const graphicDesignRouter = express.Router();

//=== ROUTES ===

//Create image
graphicDesignRouter.post("/create", async (req, res) => {
  try {
    const image = req.files.image;
    const filename = utils.getUniqueFileName(image.name);
    const uploadPath = __dirname + "/../public/uploads/" + filename;

    await image.mv(uploadPath);

    const newImage = new GraphicDesignModel({
      artImage: "/uploads/" + filename,
      imageName: req.body.imageName,
    });

    await newImage.save();
    res.redirect("/graphicDesign");
  } catch {
    res.status(400).redirect("/graphicDesign");
  }
});

//Read
graphicDesignRouter.get("/", async (req, res) => {
  const graphicDesigns = await GraphicDesignModel.find().lean();

  res.render("graphicDesign", { graphicDesigns });
});

//Delete
graphicDesignRouter.post("/:id/delete", async (req, res) => {
  try {
    const id = req.params.id;
    //Remove Image File
    GraphicDesignModel.findOne({ _id: id }, (err, image) => {
      const path = __dirname + "/../public" + image.artImage;
      fs.unlinkSync(path);
    });
    //Remove From Database
    GraphicDesignModel.findOneAndDelete({ _id: id }, (err) => {});

    res.redirect("/graphicDesign");
  } catch {
    res.redirect("/graphicDesign");
  }
});

module.exports = graphicDesignRouter;
