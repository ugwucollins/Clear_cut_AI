import "dotenv/config";
import mongoose from "mongoose";
const { MONGODB_URL } = process.env;

// console.log(MONGODB_URL);
export const DBConnection = async () => {
  // mongoose.set("useFindAndModify", false);

  return await mongoose
    .connect(MONGODB_URL)
    .then((res) => {
      console.log("Connected MongoDb successfully");
      // console.log(res);
    })
    .catch((err) => console.log(err));
};
