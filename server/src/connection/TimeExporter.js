import "dotenv/config";
import jwt from "jsonwebtoken";

export const tokenGenerator = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

const date = new Date();
export const month = date.toLocaleString("default", {
  month: "long",
});
export const year = date.getFullYear();
