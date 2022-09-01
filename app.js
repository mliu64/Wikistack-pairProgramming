const express = require("express");
const morgan = require("morgan");
const views = require("./views");
const layout = require("./views/layout");
const { db, Page, User } = require("./models");
//const path = require("path");

const PORT = 3000;

db.authenticate().then(() => {
  console.log("connected to the database");
});

const app = express();
// url and json on top
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/users'));



app.get("/", (req, res, next) => {
  res.redirect("/wiki");
});

const init = async () => {
  // await db.sync({force:true});
  await db.sync();
  // make sure that you have a PORT constant
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
