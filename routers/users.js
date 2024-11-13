const express = require("express");
const router = express.Router();
const path = require("path");
const tools = require("../tools/tools")
const fs = require('fs');

router.get("/Login", (req, res) => {
    var inputIsValid = false;
    res.render("Login", {inputIsValid})
})

router.get("/SingUp", (req, res) => {
    var inputIsValid = [false, false, false,false];
    res.render("SingUp", {inputIsValid})
})

router.post("/adduser", (req, res) => {
    const NewUser = req.body;

    const CheckData = tools.check_data(NewUser);
   
    if (CheckData.check_true) {
        tools.Save_obj(NewUser)
        var inputIsValid = false;
        res.render("Login", {inputIsValid})
    }else {
        var inputIsValid = CheckData.inputIsValid 
        res.render("SingUp", {inputIsValid})
    }
    
})

router.post("/islogin", (req, res) => {
    const User = req.body;

    const check_user = tools.user_check(User);

   
    if (check_user) {
        res.send("<h1>کارگران مشغول کارند</h1>")
    }else {
        var inputIsValid = true; 
        res.render("Login", {inputIsValid})
    }
    
})


module.exports = router;