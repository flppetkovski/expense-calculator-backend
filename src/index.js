require("./db/mongoose");
const cors = require("cors");

const express = require("express");

const userRouter = require("./routers/user");
const productRouter = require("./routers/product");

const app = express();

const port = process.env.PORT;
app.use(
  cors({
    origin: [
      "*",
      "https://petkovski-expense-calculator.netlify.app",
      "https://petkovski-expense-calculator.netlify.app/users/me/avatar",
    ],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(userRouter);
app.use(productRouter);

app.listen(port, () => {
  console.log(`port is up on ${port}`);
});
