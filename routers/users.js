const express = require("express");
const router = express.Router();
const path = require("path");
const tools = require("../tools/tools")
const fs = require('fs');
const { log } = require("console");

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
router.post("/UpdateProfile", (req, res)=>{
    const User = req.body.username ;
    const find_user = tools.find_user(User)[0]
    
    var inputIsValid = [false, false, false, false, find_user.username, find_user.password, find_user.email, find_user.Gnder]
    return res.render("editprofile", {inputIsValid})
     
})

router.post("/update", (req, res) => {
    
    const User = req.body;
    const check = tools.update_profile(User)

    if (check[0]) {
        var inputIsValid = check[1]
        // console.log();
        return res.render("editprofile", {inputIsValid});
    }else {
        var inputIsValid = check[0];
        return res.render("Login", {inputIsValid});
    }
})


router.post("/islogin", (req, res) => {
    const User = req.body;

    const check_user = tools.user_check(User);

   
    if (check_user) {
        const user_list = tools.find_user(User.username)
        
        res.render("personalPage", {username: user_list[0].username, email: user_list[0].email, Gender : user_list[0].Gnder})
    }else {
        var inputIsValid = true; 
        res.render("Login", {inputIsValid})
    }
    
})

router.post("/logout", (req, res) => {
    tools.off_login(req.body.username)
    
    var inputIsValid = false;
    res.render("Login", {inputIsValid})
})


module.exports = router;