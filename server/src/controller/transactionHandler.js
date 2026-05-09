import { month, year } from "../connection/TimeExporter.js";
import ActiveUserModel, { status } from "../model/AnalyticsModel.js";
import TransactionModel from "../model/TransactionModel.js";
import UserModel from "../model/UserModel.js";

export const getAllTransaction = async (req, res) => {
  try {
    const allTransaction = await TransactionModel.find({}).sort({
      createdAt: -1,
    });

    if (allTransaction.length === 0) {
      return res.status(404).json({
        message: "Transaction collection is Empty",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All Transaction fetched Successfully",
      success: true,
      data: allTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const getTransactionById = async (req, res) => {
  const { id } = req.params;

  try {
    const existingTransaction = await TransactionModel.findById({ _id: id });

    if (!existingTransaction) {
      return res.status(404).json({
        message: "Transaction Id Not Found ",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Transaction fetched Successfully",
      success: true,
      data: existingTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const getTransactionDetails = async (req, res) => {
  const userId = req.userId;

  try {
    const existingUser = await TransactionModel.find({ createdBy: userId });

    if (!existingUser) {
      return res.status(404).json({
        message: "Transaction Not Found ",
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

export const createTransaction = async (req, res) => {
  const userId = req.userId;
  const { title, ref, plan } = req.body;
  const pricePlan = plan;

  try {
    if (!userId) {
      return res.status(404).json({
        message: "User Id not found",
        success: false,
      });
    }

    const user = await UserModel.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({
        message: "User Account not found",
        success: false,
      });
    }

    const plans = {
      Basic: "Basic",
      Pro: "Pro",
      Advance: "Advance",
      Business: "Business",
    };

    let credit;
    let coin;
    let plan;
    let status;

    switch (title) {
      case plans.Basic:
        credit = 100;
        coin = 10;
        plan = plans.Basic;
        status = "unpaid";

        break;

      case plans.Advance:
        credit = 200;
        coin = 20;
        plan = plans.Advance;
        status = "unpaid";

        break;

      case plans.Pro:
        credit = 200;
        coin = 20;
        plan = plans.Pro;
        status = "unpaid";

        break;

      case plans.Business:
        credit = 500;
        coin = 50;
        plan = plans.Business;
        status = "unpaid";

        break;

      default:
        credit = 0;
        coin = 0;
        plan = "";
        status = "unpaid";
        break;
    }

    console.log(credit, coin, plan, status);

    const data = {
      ref: ref,
      status: status,
      credit: credit,
      coins: coin,
      plan: plan || pricePlan,
      userEmail: user.email,
      name: user.name,
      createdBy: userId,
      year: year,
      month: month,
    };

    const generatedTransaction = await TransactionModel.create(data);

    const Transaction = generatedTransaction.save();

    return res.status(200).json({
      message: "Transaction Created Successfully",
      success: true,
      data: Transaction || generatedTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Internal Server Error" || error,
      success: false,
    });
  }
};

export const verifyTransaction = async (req, res) => {
  const userId = req.userId;
  const { ref } = req.body;

  try {
    if (!userId) {
      return res.status(404).json({
        message: "User Id not found",
        success: false,
      });
    }
    const user = await UserModel.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({
        message: "User Account not found",
        success: false,
      });
    }

    const data = {
      ref: ref,
      status: "paid",
      email: user.email,
      isPaid: true,
    };

    const processTransaction = await TransactionModel.findOneAndUpdate(
      { ref: ref },
      data,
      {
        new: true,
      },
    );

    if (processTransaction) {
      user.coins += processTransaction.coins;
      user.plan = processTransaction.plan;
      await user.save();
      await processTransaction.save();

      const data = {
        userEmail: user.email,
        activeUser: user._id,
        status: status.BuyCoins,
        month: month,
        year: year,
      };
      const actUser = await ActiveUserModel.create(data);
      await actUser.save();

      return res.status(200).json({
        message: "Transaction Created Successfully",
        success: true,
        data: processTransaction,
        url: "/workspace",
      });
    } else {
      return res.status(403).json({
        message: "Transaction Error",
        success: false,
        url: "/price",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Internal Server Error" || error,
      success: false,
    });
  }
};

export const updateTransaction = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  const { status } = req.body;

  try {
    const existingTransaction = await TransactionModel.findOne({
      createdBy: userId,
    });

    if (!existingTransaction) {
      return res.status(404).json({
        message: "Transaction Not Found",
        success: false,
      });
    }

    const data = {
      status: status,
      isPaid: true,
      credit: existingTransaction.credit,
    };

    const updateTransaction = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      },
    );

    return res.status(200).json({
      message: "Transaction has been Public Successfully",
      success: true,
      data: updateTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Internal Server Error" || error,
      success: false,
    });
  }
};

export const updateTransactionStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const existingUser = await TransactionModel.findById({ _id: id });

    if (!existingUser) {
      return res.status(404).json({
        message: "Transaction Id Not Found ",
        success: false,
      });
    }

    const data = {
      status: status,
    };

    const Transaction = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      },
    );

    return res.status(200).json({
      message: "Transaction status updated Successfully",
      success: true,
      data: Transaction,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const existingTransaction = await TransactionModel.findById({ _id: id });

    if (!existingTransaction) {
      return res.status(404).json({
        message: "Transaction Not Found ",
        success: false,
      });
    }

    const Transaction = await TransactionModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      message: "Transaction deleted Successfully",
      success: true,
      data: Transaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Internal Server Error" || error,
      success: false,
    });
  }
};

export const deleteTransactionRef = async (req, res) => {
  const { ref } = req.body;

  try {
    const existingTransaction = await TransactionModel.findById({ ref: ref });

    if (!existingTransaction) {
      return res.status(404).json({
        message: "Transaction Ref Not Found ",
        success: false,
      });
    }

    const Transaction = await TransactionModel.findOneAndDelete({ ref: ref });

    return res.status(200).json({
      message: "Transaction deleted Successfully",
      success: true,
      data: Transaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Internal Server Error" || error,
      success: false,
    });
  }
};
