const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: [200, 'Habit name can only be up to 200 characters']
  },
  description: {
    type: String,
    required: true,
    maxlength: [1000, 'Description can only be up to 1000 characters']
  },
  freq: {
    type: Number,
    min: [0, 'Frequency must be greater than 0'],
    required: false,
    default: 0,
  },
  targetFreq: {
    type: Number,
    min: [1, 'Frequency must be greater than 1'],
    required: true,
  },
  complete: {
    type: Boolean,
    default: false
  },
  streak:{
    type: Number,
    min: [0],
    default: 0
  }
},{
    collection: 'habits'
});



const Habit = mongoose.model("habits", HabitSchema);


module.exports = Habit
