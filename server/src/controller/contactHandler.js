import ContactModel from "../model/ContactModel.js";
import { month, year } from "../connection/TimeExporter.js";

export const getAllContact = async (req, res) => {
  try {
    const allContact = await ContactModel.find({});

    if (allContact.length === 0) {
      return res.status(404).json({
        message: "Contact collection is Empty",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All Contact fetched Successfully",
      success: true,
      data: allContact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const getContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const existingContact = await ContactModel.findById({ _id: id });

    if (!existingContact) {
      return res.status(404).json({
        message: "Contact Id Not Found ",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Contact fetched Successfully",
      success: true,
      data: existingContact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const getContactDetails = async (req, res) => {
  const userId = req.userId;

  try {
    const existingUser = await ContactModel.findById({ createdBy: userId });

    if (!existingUser) {
      return res.status(404).json({
        message: "contact Not Found ",
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

export const createContact = async (req, res) => {
  const userId = req.userId;
  const { name, email, subject, message } = req.body;

  try {
    if (!email || !name || !subject || !message) {
      return res.status(404).json({
        message: "Please fill in the gaps",
        success: false,
      });
    }

    const data = {
      name: name,
      email: email,
      subject: subject,
      message: message,
      userId: userId,
      year: year,
      month: month,
    };

    const newContact = await ContactModel.create(data);

    const contact = newContact.save();

    return res.status(200).json({
      message: "Contact Created Successfully",
      success: true,
      data: contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const updateContact = async (req, res) => {
  const userId = req.userId;
  const { name, subject, message } = req.body;

  try {
    const existingContact = await ContactModel.findOne({ createdBy: userId });
    if (!existingContact) {
      return res.status(404).json({
        message: "Contact Not Found",
        success: false,
      });
    }

    const data = {
      name: name,
      subject: subject,
      message: message,
    };

    const updateContact = await ContactModel.findOneAndUpdate(
      { createdBy: userId },
      data,
      {
        new: true,
      },
    );

    return res.status(200).json({
      message: "Contact Updated Successfully",
      success: true,
      data: updateContact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const updateContactStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const existingUser = await ContactModel.findById({ _id: id });

    if (!existingUser) {
      return res.status(404).json({
        message: "Contact Id Not Found ",
        success: false,
      });
    }

    const data = {
      status: status,
    };

    const contact = await ContactModel.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });

    return res.status(200).json({
      message: "contact status updated Successfully",
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const existingContact = await ContactModel.findById({ _id: id });

    if (!existingContact) {
      return res.status(404).json({
        message: "Contact Not Found ",
        success: false,
      });
    }

    const Contact = await ContactModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      message: "Contact deleted Successfully",
      success: true,
      data: Contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};
