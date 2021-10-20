const express = require("express");
const app = express();
const router = require("./routes");
const connectDB = require("./db/connect");
require("dotenv").config();

app.get("/", (req, res) => {
  res.send({ message: "Backend API" });
});

app.use(express.json());
app.use("/api/v1/tasks", router);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server running at port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
