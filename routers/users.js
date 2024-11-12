const express = require("express");
const router = express.Router();
const path = require("path");
const tools = require("../tools/tools")
const fs = require('fs');

router.get("/Login", (req, res) => {
    res.render("Login")
})

router.get("/SingUp", (req, res) => {
    res.render("SingUp")
})

router.post("/adduser", (req, res) => {
    const NewUser = req.body;
    tools.Save_obj(NewUser)
    res.render("Login")
})


module.exports = router;