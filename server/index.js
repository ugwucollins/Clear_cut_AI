import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { DBConnection } from "./src/connection/mongoDBCon.js";
import authRouter from "./src/routes/AuthRoute.js";
import usersRouter from "./src/routes/UsersRoute.js";
import contactRouter from "./src/routes/ContactRoute.js";

const app = express();
const { PORT, API_PATH, ORIGIN_URL } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
DBConnection;
app.use(
  cors({
    origin: ORIGIN_URL,
    credentials: true,
  }),
);

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get(API_PATH, (req, res) => {
  res.send("Hello World! New Api");
});
app.use(API_PATH, authRouter);
app.use(API_PATH, usersRouter);
app.use(API_PATH, contactRouter);

// app.use(errorHandler);
app.use(async (req, res, next) => {
  res.status(404).json({
    message: "Url path Not Found, Please check Your Link",
    success: false,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
