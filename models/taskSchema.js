const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: [true, "Task name is required!"],
      trim: true,
      maxlength: [50, "Task name is too long"]
    },
    taskDateTime: {
      type: String,
      required: [true, "Task Date is required!"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "completed", "cancelled"],
        message: "Status must be pending/completed/cancelled"
      },
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Task", taskSchema);