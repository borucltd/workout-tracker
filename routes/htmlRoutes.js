// import 
const express = require('express')
const db = require("../models");

// define router
const router = express.Router()


// =========================================
router.get("/", function(req, res) {
    res.sendFile("index.html");
  });


module.exports = router