const express = require("express");
const app = express();
const path = require("path");
const Routers = require("./routers/users");
const bodyParser = require('body-parser');
const port = 3500;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next)=>{
//     console.log(req);
//     next()
// })

app.use("/", Routers);

app.listen(port, function(){
    console.log(`server is runing on port ${port}`);
});