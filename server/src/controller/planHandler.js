import { month, year } from "../connection/TimeExporter.js";
import PlanModel from "../model/PlanModel.js";

export const getAllPlan = async (req, res) => {
  try {
    const allPlan = await PlanModel.find({}).sort({ createdAt: -1 });

    if (allPlan.length === 0) {
      return res.status(404).json({
        message: "Plan collection is Empty",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All Plan fetched Successfully",
      success: true,
      data: allPlan,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error || "Internal Server Error",
      success: false,
    });
  }
};

export const getPlanById = async (req, res) => {
  const { id } = req.params;

  try {
    const existingPlan = await PlanModel.findById({ _id: id });

    if (!existingPlan) {
      return res.status(404).json({
        message: "Plan Id Not Found ",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Plan fetched Successfully",
      success: true,
      data: existingPlan,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error || "Internal Server Error",
      success: false,
    });
  }
};

export const getPlanDetails = async (req, res) => {
  const userId = req.userId;

  try {
    const existingUser = await PlanModel.findById({ createdBy: userId });

    if (!existingUser) {
      return res.status(404).json({
        message: "Plan Not Found ",
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
    res.status(500).json({
      message: error.message || error || "Internal Server Error",
      success: false,
    });
  }
};

export const createPlan = async (req, res) => {
  const userId = req.userId;
  const { title, plan, list, message, amount, btnText, value } = req.body;
  console.log(title, plan, list, message, amount, btnText, value);
  try {
    if (!userId) {
      return res.status(404).json({
        message: "Please Login First",
        success: false,
      });
    }

    if (!plan || !title || !list || !message || !amount || !btnText || !value) {
      return res.status(404).json({
        message: "Please fill in the gaps",
        success: false,
      });
    }
    const priceArray = list.split("\n");

    const data = {
      title: title,
      plan: plan,
      list: priceArray,
      amount: amount,
      btnText: btnText,
      value: +value,
      // status: status,
      message: message,
      createdBy: userId,
      year: year,
      month: month,
    };

    const newPlan = await PlanModel.create(data);

    const Plan = newPlan.save();

    return res.status(200).json({
      message: "Price Plan Created Successfully",
      success: true,
      data: Plan,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error || "Internal Server Error",
      success: false,
    });
  }
};

export const updatePlan = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  console.log(id);

  const { title, plan, list, message, amount, btnText, value } = req.body;
  try {
    if (!userId) {
      return res.status(404).json({
        message: "No User  Found",
        success: false,
      });
    }

    const existingPlan = await PlanModel.findById({ _id: id });

    if (!existingPlan) {
      return res.status(404).json({
        message: "Plan Id Not Found",
        success: false,
      });
    }

    const data = {
      title: title,
      plan: plan,
      list: list,
      amount: amount,
      btnText: btnText,
      value: value,
      message: message,
      //   status: status,
      //   createdBy: userId,
    };

    const EditedPlan = await PlanModel.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    const updatedPlan = await EditedPlan.save();

    return res.status(200).json({
      message: "Plan Updated Successfully",
      success: true,
      data: updatedPlan,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error || "Internal Server Error",
      success: false,
    });
  }
};

export const updatePlanStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const existingUser = await PlanModel.findById({ _id: id });

    if (!existingUser) {
      return res.status(404).json({
        message: "Plan Id Not Found ",
        success: false,
      });
    }

    const data = {
      status: status,
    };

    const Plan = await PlanModel.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });

    return res.status(200).json({
      message: "Plan status updated Successfully",
      success: true,
      data: Plan,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error || "Internal Server Error",
      success: false,
    });
  }
};

export const deletePlan = async (req, res) => {
  const { id } = req.params;

  try {
    const existingPlan = await PlanModel.findById({ _id: id });

    if (!existingPlan) {
      return res.status(404).json({
        message: "Plan Not Found ",
        success: false,
      });
    }

    const Plan = await PlanModel.findByIdAndDelete({ _id: id });
    await Plan.save();

    return res.status(200).json({
      message: "Plan deleted Successfully",
      success: true,
      data: Plan,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error || "Internal Server Error",
      success: false,
    });
  }
};
