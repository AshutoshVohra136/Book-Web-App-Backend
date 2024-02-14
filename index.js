const express = require("express");

const config = require("./config/db");
const app = express();
const port = 3000;

const routes = require("./routes/apiroutes");
//  this middleware that is
//  express.urlencoded is used for postman
//  as postman send unfefined data so that
//  no error occurs.
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

//this middleware i.e. static is used
//  to tell everyone that
//  our files exist in public folder
app.use(express.static(__dirname + "/public/"));

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Success😊",
  });
});
app.get("/api/test", (req, res) => {
  res.json({
    status: 200,
    message: "Api-Test",
  });
});
app.use("/api", routes);

const seeder = require("./config/seeder");
seeder.adminreg();
app.listen(port, () => {
  console.log(`Server Running on Port :- ${port} `);
});
