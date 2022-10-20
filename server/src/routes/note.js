const express = require("express");
const Notes = require("../models/Notes");
const auth = require("../middlewares/auth");
const routes = express.Router();

routes.post("/note/add", auth, async (req, res) => {
  const newNote = req.body;
  const fieldsToAdd = Object.keys(newNote);
  const fieldsInModel = ["title", "description"];
  const isAdditionAllowed = fieldsToAdd.every((field) =>
    fieldsInModel.includes(field)
  );
  if (!isAdditionAllowed) {
    return res.status(400).send({ error: "Invalid fields to Add!" });
  }
  try {
    const note = await Notes({
      ...newNote,
      user: req.user._id,
    });
    await note.save();
    res.send({ note });
  } catch (e) {
    res.status(400).send(e);
  }
});

routes.post("/note/list", auth, async (req, res) => {
  try {
    const notes = await Notes.find({
      user: req.user._id,
    });
    res.send(notes);
  } catch (e) {
    res.status(500).send;
  }
});

routes.patch("/note/update", auth, async (req, res) => {
  const editNote = req.body;
  const fieldsToUpdate = Object.keys(editNote);
  const fieldsInModel = ["_id", "important", "done"];

  const isUpdateAllowed = fieldsToUpdate.every((field) =>
    fieldsInModel.includes(field)
  );

  if (!isUpdateAllowed) {
    return res.status(400).send({ error: "Invalid fields to update!" });
  }

  const updateObj = {};

  if (editNote.hasOwnProperty("important")) {
    updateObj.important = editNote.important;
  }
  if (editNote.hasOwnProperty("done")) {
    updateObj.done = editNote.done;
  }

  try {
    const note = await Notes.findByIdAndUpdate(
      {
        _id: editNote._id,
        user: req.user._id,
      },
      updateObj,
      { new: true, runValidators: true }
    );
    if (!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (e) {
    res.status(400).send(e);
  }
});

routes.delete("/note/delete", auth, async (req, res) => {
  try {
    const note = await Notes.findById(req.body._id);
    await note.remove();
    res.send(note);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = routes;
