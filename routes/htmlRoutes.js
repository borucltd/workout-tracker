// import 
const express = require('express')
const db = require("../models");

// define router
const router = express.Router()


// =========================================

router.get("/", function(req, res) {
  res.sendFile("index.html");
});

router.get("/exercise", function(req, res) {
  res.sendFile("exercise.html",{ root: './public'});
});

router.get("/stats", function(req, res) {
  res.sendFile("stats.html",{ root: './public'});
});


module.exports = router