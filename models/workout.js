const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  
  exercises: [new Schema(
    {
    type: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      trim: true,
    },
    distance: {
      type: Number,
      trim: true,
    },
    weight: {
      type: Number,
      trim: true,
    },
    reps: {
      type: Number,
      trim: true,
    },
    sets: {
      type: Number,
      trim: true,
    }
  }, { _id: false },)],

  totalDuration: {
    type: Number,
    default: function () {
      let tDuration = 0
      this.exercises.forEach(item => {
        tDuration = tDuration + item.duration
      }); 
      return tDuration
    }
  }
});





const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
