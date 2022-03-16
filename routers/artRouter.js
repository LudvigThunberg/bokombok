const express = require("express");
const mongoose = require("mongoose");
const ArtModel = require("../models/ArtModel.js");
const fileUpload = require("express-fileupload");
const utils = require("../utils.js");
const fs = require("fs");
const artRouter = express.Router();

//=== ROUTES ===

//Create image
artRouter.post("/create", async (req, res) => {
  try {
    const image = req.files.image;
    const filename = utils.getUniqueFileName(image.name);
    const uploadPath = __dirname + "/../public/uploads/" + filename;

    await image.mv(uploadPath);

    const newArtImage = new ArtModel({
      artImage: "/uploads/" + filename,
      imageName: req.body.imageName,
    });

    await newArtImage.save();
    res.redirect("/art");
  } catch {
    res.status(400).redirect("/art");
  }
});

//Read
artRouter.get("/", async (req, res) => {
  const arts = await (await ArtModel.find().lean()).reverse();

  res.render("art", { arts });
});

//Delete
artRouter.post("/:id/delete", async (req, res) => {
  try {
    const id = req.params.id;
    //Remove Image File
    ArtModel.findOne({ _id: id }, (err, image) => {
      const path = __dirname + "/../public" + image.artImage;
      fs.unlinkSync(path);
    });
    //Remove From Database
    ArtModel.findOneAndDelete({ _id: id }, (err) => {});

    res.redirect("/art");
  } catch {
    res.redirect("/art");
  }
});

module.exports = artRouter;
