const express = require("express");
const { NoteModel } = require("../model/Note.Model");

const jwt = require("jsonwebtoken");
const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "masai", async (err, decoded) => {
      if (decoded) {
        const { userID } = decoded;
        const note = await NoteModel.find({ user: userID });
        res.status(200).send(note);
      } else {
        res.status(401).send({ msg: "User not allowed" });
      }
    });
  }
});

noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  const note = new NoteModel(payload);
  await note.save();
  res.send({ msg: "Note Created" });
});

noteRouter.patch("/update/:id", async (req, res) => {
  const noteID = req.params.id;
  const payload = req.body;
  try {
    await NoteModel.findByIdAndUpdate({ _id: noteID }, payload);
    res.send({ msg: `Note with id:${noteID} has been update` });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const noteID = req.params.id;
  const note = await NoteModel.findOne({ _id: noteID });
  try {
    await NoteModel.findByIdAndDelete({ _id: noteID });
    res.send({ msg: `Note with id:${noteID} has been deleted` });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  noteRouter,
};
