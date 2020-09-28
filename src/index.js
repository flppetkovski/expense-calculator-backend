require("./db/mongoose");
const cors = require("cors");

const express = require("express");

app.use(function (req, res, next) {
  let whitelist = ["localhost:4000", "localhost:3000", "anydomain.com", "null"], ;
  let host = req.get("host");

  whitelist.forEach(function (val, key) {
    if (host.indexOf(val) > -1) {
      res.setHeader("Access-Control-Allow-Origin", host);
    }
  });

  next();
});

const userRouter = require("./routers/user");
const productRouter = require("./routers/product");

const app = express();

const port = process.env.PORT;

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(userRouter);
app.use(productRouter);

app.listen(port, () => {
  console.log(`port is up on ${port}`);
});
