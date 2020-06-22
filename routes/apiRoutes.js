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
  console.log("Type:" + req.body.type)
  console.log("ID" + req.params.id)
  let new_exercise = {}
  if (req.body.type === "cardio") {
    // cardio
    new_exercise = {
        type: req.body.type,
        name: req.body.name,
        distance: req.body.distance,
        duration: req.body.duration
      }
  } else {
    // non-cardio
    new_exercise = {
      type: req.body.type,
      name: req.body.name,
      duration: req.body.duration,
      weight: req.body.weight,
      reps: req.body.reps,
      sets: req.body.sets
    }
  }

  console.log(new_exercise)
  //  db.collection.updateOne(query, update, [options], [callback]) mongoose.Types.ObjectId(req.params.id)
  db.Workout.updateOne(
    {
      _id: req.params.id
    },
    {
      $push: { exercises : new_exercise } 
    },
    function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
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