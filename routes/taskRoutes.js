const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const tasks = require("../models/taskSchema");


router.get('/', asyncHandler(async (req, res) => {
const response = await tasks.find();
if (response.length === 0) {
res.status(200).json({message: "No tasks found"})
}
console.log("data fetched successfully");
res.status(200).json(response);
}));


router.post('/', asyncHandler(async (req, res) => {
const data = req.body;
if (!data.taskName || data.taskName.trim() === "") {
return res.status(400).json({message: "Task name is required!"})
}
const newTask = new tasks(data);
const response = await newTask.save();
console.log("data posted successfully");
res.status(201).json(response);
}));


router.put('/:id', asyncHandler(async (req, res) => {
const { id } = req.params;
const data = req.body;
if (!data || Object.keys(data).length === 0) {
return res.status(400).json({message: "No data update!"})
}

const response = await tasks.findByIdAndUpdate(id, data, {
new: true,
runValidators: true
});

if (!response) {
return res.status(404).json({message: "Document not found!"});
}

console.log("data updated successfully");
res.status(200).json(response);
}));


router.delete('/:id', asyncHandler(async (req, res) => {
const { id } = req.params;
const response = await tasks.findByIdAndDelete(id);
if (!response) {
return res.status(404).json({message: "Document not found!"});
}
console.log("data deleted successfully");
res.status(200).json({message: "data deleted successfully"})
}));

module.exports = router;