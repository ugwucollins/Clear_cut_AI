import ActiveUserModel from "../model/AnalyticsModel.js";
import { month, year } from "../connection/TimeExporter.js";

export const getAllAnalytics = async (req, res) => {
  try {
    const allAnalytics = await ActiveUserModel.find({}).sort({ createdAt: -1 });

    if (allAnalytics.length === 0) {
      return res.status(404).json({
        message: "Analytics collection is Empty",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All Analytics fetched Successfully",
      success: true,
      data: allAnalytics,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const getAnalyticsById = async (req, res) => {
  const { id } = req.params;

  try {
    const existingAnalytics = await ActiveUserModel.findById({ _id: id });

    if (!existingAnalytics) {
      return res.status(404).json({
        message: "Analytics Id Not Found ",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Analytics fetched Successfully",
      success: true,
      data: existingAnalytics,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const getAnalyticsDetails = async (req, res) => {
  const userId = req.userId;

  try {
    const existingAnalytics = await ActiveUserModel.findById({
      _id: userId,
    });

    if (!existingAnalytics) {
      return res.status(404).json({
        message: "Analytics Not Found ",
        success: false,
      });
    }

    const Analytics = existingAnalytics;

    return res.status(200).json({
      message: "Analytics fetched Successfully",
      success: true,
      data: Analytics,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const createAnalytics = async (req, res) => {
  const userId = req.userId;
  const { email, status } = req.body;

  try {
    if (!userId || !email || !status) {
      return res.status(404).json({
        message: "Analytics info Not Found ",
        success: false,
      });
    }

    const data = {
      userEmail: email,
      activeUser: userId,
      status: status,
      month: month,
      year: year,
    };

    const Analytics = await ActiveUserModel.create(data);

    return res.status(201).json({
      message: "Analytics created Successfully",
      success: true,
      data: Analytics,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const updateAnalytics = async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNumber } = req.body;

  try {
    const existingAnalytics = await ActiveUserModel.findById({
      _id: id,
    });

    if (!existingAnalytics) {
      return res.status(404).json({
        message: "Analytics Not Found ",
        success: false,
      });
    }

    const data = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
    };

    const Analytics = await ActiveUserModel.findByIdAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      },
    ).select("-password");
    await Analytics.save();

    return res.status(200).json({
      message: "Analytics updated Successfully",
      success: true,
      data: Analytics,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const updateAnalyticStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const existingAnalytics = await ActiveUserModel.findById({ _id: id });

    if (!existingAnalytics) {
      return res.status(404).json({
        message: "Analytics Id Not Found ",
        success: false,
      });
    }

    const data = {
      status: status,
    };

    const Analytics = await ActiveUserModel.findByIdAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      },
    );

    return res.status(200).json({
      message: "Analytics status updated Successfully",
      success: true,
      data: Analytics,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const deleteAnalytics = async (req, res) => {
  const { id } = req.params;

  try {
    const existingAnalytics = await ActiveUserModel.findById({
      _id: id,
    });

    if (!existingAnalytics) {
      return res.status(404).json({
        message: "Analytics id Not Found ",
        success: false,
      });
    }

    const Analytics = await ActiveUserModel.findByIdAndDelete({
      _id: id,
    });

    return res.status(200).json({
      message: "Analytics deleted Successfully",
      success: true,
      data: Analytics,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};
