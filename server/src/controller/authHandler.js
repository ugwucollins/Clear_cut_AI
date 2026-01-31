import { year, month, tokenGenerator } from "../connection/TimeExporter.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import UserModel from "../model/UserModel.js";
import nodemailer from "nodemailer";

const { NODE_ENV, EMAIL, PASSWORD } = process.env;
export const Register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      return res.status(208).json({
        message: "User Already Exist ",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      name: name,
      password: hashedPassword,
      email: email,
      month: month,
      year: year,
    };

    const newUser = await UserModel.create(data);
    const user = await newUser.save();

    return res.status(201).json({
      message: "User created Successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({
        message: "User Does not Have An Account, please SignUp ",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );
    const token = tokenGenerator(existingUser._id);
    const user = existingUser;

    if (hashedPassword) {
      await res.cookie("token", token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production" ? "none" : "Strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        message: "Login Successfully",
        success: true,
        data: user,
        token: token,
      });
    } else {
      return res.status(404).json({
        message: "InCorrect Password",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const LogOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "Strict",
    });

    return res.status(200).json({
      message: "cleared cookies Successfully,logged Out",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const verifyUser = async (req, res) => {
  const userId = req.userId;

  try {
    const existingUser = await UserModel.findById({ _id: userId }).select(
      "-password",
    );

    if (!existingUser) {
      return res.status(404).json({
        message: "User Not Found ",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User Auth Successfully",
      success: true,
      data: existingUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const Forget_Password = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User Does Not Exist",
        success: false,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const mailOptions = {
      from: EMAIL,
      to: email,
      subject: "Forget Password Verification",
      html: `
      <div>
      <h1>Hi ${user.lastName} ${user.firstName} </h1>
      <br/>
      <h2>Please Click the Link Below to Change your Password</h2>
      <a href="https://nelly-j.vercel.app/auth/reset-password/${user._id}/${token}">Click Here, Please Don't Share the Link</a> 

      <h3>If You Didn't Request this Change, Please Ignore this Email</h3>
      <h3>Thanks</h3>
      </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({
          message: "Sever Error In Sending Email",
          error: error.message,
          success: false,
        });
      }

      return res.status(200).json({
        message: "Email Sent Successfully",
        success: true,
      });
    });
  } catch (error) {
    res.status(501).json({
      message: "Sever Error In Forgetting Password",
      error: error.message,
      success: false,
    });
  }
};

export const Reset_Password = async (req, res) => {
  const { password } = req.body;
  const { id, token } = req.params;
  try {
    if (!id) {
      return res.status(404).json({
        message: "Invalid Response",
        success: false,
      });
    }
    const user = await UserModel.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }
    if (!token) {
      return res.status(404).json({
        message: "No valid Token Provided",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      password: hashedPassword,
    };
    const decoded = jwt.verify(token, JWT_SECRET);
    const UserId = decoded.id;

    if (!UserId) {
      return res.status(404).json({
        message: "User Details not Found",
        success: false,
      });
    }
    const userPassword = await UserModel.findByIdAndUpdate(
      { _id: UserId },
      data,
      {
        new: true,
      },
    );
    const newUser = userPassword;
    return res.status(200).json({
      message: "Password Changed Successfully",
      success: true,
      data: newUser,
    });
  } catch (error) {
    res.status(501).json({
      message: "Sever Error In Reset_Password",
      error: error,
      success: false,
    });
  }
};
