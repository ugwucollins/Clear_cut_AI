import mongoose from "mongoose";
import "dotenv/config";
const { MONGODB_URL } = process.env;

export const DBConnection = mongoose
  .connect(MONGODB_URL)
  .then((res) => {
    console.log("Connected MongoDb successfully");
    // console.log(res);
  })
  .catch((err) => console.log(err));
