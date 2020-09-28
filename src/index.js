require("./db/mongoose");
const cors = require("cors");

const express = require("express");

const userRouter = require("./routers/user");
const productRouter = require("./routers/product");

const app = express();

const port = process.env.PORT;

app.use(
  cors({
    allowedHeaders: [
      "sessionId",
      "authorization",
      "Authorization",
      "Content-Type",
      "Access-Control-Allow-Origin",
    ],
    exposedHeaders: ["sessionId"],
    origin: "*",
    "Access-Control-Allow-Origin": "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.use(express.json());
app.use(userRouter);
app.use(productRouter);

app.listen(port, () => {
  console.log(`port is up on ${port}`);
});
