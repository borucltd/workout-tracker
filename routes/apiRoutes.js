// import 
const mongoose = require("mongoose");
const express = require('express')
const db = require("../models");

// define router
const router = express.Router()
const databaseUrl = process.env.DATABASE_URI
const databasePort = process.env.DATABASE_PORT
const databaseName = process.env.DATABASE_NAME
const databaseUser = process.env.DATABASE_USER
const databasePassword = process.env.DATABASE_PASSWORD

mongoose.connect(`mongodb://${databaseUser}:${databasePassword}@${databaseUrl}:${databasePort}/${databaseName}`, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// FETCH => /api/workouts
router.get("/api/workouts", function(req, res) {
    console.log("Checking workouts")
    db.Workout.find({}).sort( { day: 1 })
    .then(data => {                   
      res.json(data)
    })
});

// PUT => addExercise


// POST => /api/workouts



// GET => /api/workouts/range
router.put("/api/workouts/:id", function(req, res) {
  console.log("ADDING workout with id " + req.params.id)
  let exerciseW = {}
  if (req.body.type === "cardio") {
    // cardio
    exerciseW = {
        type: req.body.type,
        name: req.body.name,
        distance: req.body.distance,
        duration: req.body.duration
      }

  } else {
    // non-cardio
    exerciseW = {
      type: req.body.type,
      name: req.body.name,
      duration: req.body.duration,
      weight: req.body.type,
      reps: req.body.reps,
      sets: req.body.sets
    }

  }

  // create workout
  db.Workout.create({
    day: new Date().setDate(new Date().getDate()-10),
    exercise: [exerciseW]
  }, function (err, small) {
    if (err) return handleError(err);
    // saved!
    res.status(200)
  });
});

router.post("/api/workouts", function(req, res) {
  console.log("heeere")
  db.Workout.find({})
  .then(data => {
    console.log(data[1]);   
    res.json(data[1])
  })
});






module.exports = router