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



// ========================================= 
router.get("/api/workouts", function(req, res) {
    console.log("heeere")
    db.Workout.find({})
    .then(data => {
      console.log(data[1]);
      res.json(data[1])
    })

});



module.exports = router