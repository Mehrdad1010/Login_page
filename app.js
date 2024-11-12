const express = require("express");
const app = express();
const path = require("path");
const Routers = require("./routers/users");
const port = 3500;

app.use("view engine", "ejs");
app.use("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", Routers);

app.listen(port, function(){
    console.log(`server is runing on port ${port}`);
});