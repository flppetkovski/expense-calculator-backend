require("./db/mongoose")

const express = require("express");

const userRouter = require("./routers/user")
const productRouter = require("./routers/product")

const app = express();

const port = process.env.PORT

app.use(express.json());
app.use(userRouter)
app.use(productRouter)


app.listen(port, () => {
  console.log(`port is up on ${port}`);
});