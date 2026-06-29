const express = require("express");
const cors = require("cors");
const {connectMongoDB} = require("./connect/mongoose")

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, (error) => {
  if (error) {
    console.log("Something is wrong error = " + error);
  } else {
    console.log("Server runnig on PORT" + "" + PORT);
  }
});

connectMongoDB()

const uploadRouter = require("./views/upload.router")

app.use("/api", uploadRouter)