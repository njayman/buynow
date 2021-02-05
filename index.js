const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { PORT, NODEENV, MONGOURI } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

let muri = MONGOURI;

mongoose
  .connect(muri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((err) => console.log(err));
const port = PORT || 5000;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("database is up and running");
});

const userRoute = require("./routes/user.route");
app.use("/user", userRoute);

app.listen(port, () =>
  console.log(`server is up! Port ${port} | Environment ${NODEENV}`)
);
