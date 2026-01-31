import jwt from "jsonwebtoken";
import "dotenv/config";
const { JWT_SECRET } = process.env;

export const protectedAuth = (req, res, next) => {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.id) {
      req.userId = decoded.id;
    } else {
      res.status(404).json({
        message: "No token provided",
        success: false,
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: "Invalid token",
      success: false,
    });
  }
};
