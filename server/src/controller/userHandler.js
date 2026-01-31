import UserModel from "../model/UserModel.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find({});

    if (allUsers.length === 0) {
      return res.status(404).json({
        message: "Users collection is Empty",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All Users fetched Successfully",
      success: true,
      data: allUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const existingUser = await UserModel.findById({ _id: id });

    if (!existingUser) {
      return res.status(404).json({
        message: "User Id Not Found ",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User fetched Successfully",
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
export const getUserDetails = async (req, res) => {
  const userId = req.userId;

  try {
    const existingUser = await UserModel.findById({ _id: userId });

    if (!existingUser) {
      return res.status(404).json({
        message: "User Not Found ",
        success: false,
      });
    }

    const user = existingUser;

    return res.status(200).json({
      message: "User fetched Successfully",
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

export const updateUser = async (req, res) => {
  const userId = req.userId;
  const { name, email, phoneNumber } = req.body;

  try {
    const existingUser = await UserModel.findById({ _id: userId });

    if (!existingUser) {
      return res.status(404).json({
        message: "User Not Found ",
        success: false,
      });
    }
    const data = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
    };

    const user = await UserModel.findByIdAndUpdate({ _id: userId }, data, {
      new: true,
    });

    return res.status(200).json({
      message: "User updated Successfully",
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

export const updateUserPassword = async (req, res) => {
  const userId = req.userId;
  const { password, newPassword } = req.body;

  try {
    const existingUser = await UserModel.findById({ _id: userId });

    if (!existingUser) {
      return res.status(404).json({
        message: "User Not Found ",
        success: false,
      });
    }

    const checkPassword = await bcrypt.compare(password, existingUser.password);

    if (checkPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const data = {
        password: hashedPassword,
      };

      const user = await UserModel.findByIdAndUpdate({ _id: userId }, data, {
        new: true,
      });

      return res.status(200).json({
        message: "User password updated Successfully",
        success: true,
        data: user,
      });
    } else {
      return res.status(404).json({
        message: "Please enter the correct old password",
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
export const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const existingUser = await UserModel.findById({ _id: id });

    if (!existingUser) {
      return res.status(404).json({
        message: "User Id Not Found ",
        success: false,
      });
    }

    const data = {
      status: status,
    };

    const user = await UserModel.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });

    return res.status(200).json({
      message: "User status updated Successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.userId;

  try {
    const existingUser = await UserModel.findById({ _id: userId });

    if (!existingUser) {
      return res.status(404).json({
        message: "User Not Found ",
        success: false,
      });
    }

    const user = await UserModel.findByIdAndDelete({ _id: userId });

    return res.status(200).json({
      message: "User deleted Successfully",
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
