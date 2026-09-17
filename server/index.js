export const PriceArray = [
  {
    title: "Basic",
    plan: "Basic",

    amount: "100",
    message: "Perfect for trying out our AI features",
    value: 100 * 100,
    list: [
      "10 credits per month",
      "Standard Definition (SD)",
      "Single image processing",
      "Standard quality",
    ],
    btn: "Get Started",
    path: "",
    topTitle: "Basic Use",
  },

  {
    title: "pro",
    plan: "Advance",
    amount: "200",
    message: "Best for creative professionals",
    value: 200 * 100,
    list: [
      "20 credits per month",
      "High Definition (SD)",
      "Batch processing (50 images) ",
      "Priority support",
    ],
    btn: "Choose Pro",
    path: "",
    topTitle: "Most popular",
  },

  {
    title: "business",
    plan: "Business",
    amount: "500",
    message: "Advanced tools for teams and scale",
    value: 500 * 100,
    list: [
      "50 credits per month",
      "Standard Definition (SD)",
      "Single image processing",
      "No Api Access",
    ],
    btn: "Contact Sales",
    path: "",
    topTitle: "Contact popular",
  },
];

import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { DBConnection } from "./src/connection/mongoDBCon.js";
import { month, year } from './src/connection/TimeExporter.js';
import PlanModel from './src/model/PlanModel.js';
import AnalyticsRouter from "./src/routes/AnalyticsRoute.js";
import authRouter from "./src/routes/AuthRoute.js";
import contactRouter from "./src/routes/ContactRoute.js";
import imageRouter from "./src/routes/ImageRoute.js";
import planRouter from "./src/routes/PlanRoute.js";
import transactionRouter from "./src/routes/TransactionRoute.js";
import usersRouter from "./src/routes/UsersRoute.js";

const app = express();
const { PORT, API_PATH, ORIGIN_URL, ORIGIN_URL2 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DBConnection();
app.use(
  cors({
    origin: [ORIGIN_URL, ORIGIN_URL2],
    credentials: true,
  }),
);

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get(API_PATH, (req, res) => {
  res.send("Hello World! New Api");
});

// seed
export const createPlan = async () => {
  console.log("Creating Price Plan");
       
    // console.log(title, plan, list, message, amount, btnText, value);
 for (const key in PriceArray) {
  const pricePlan = PriceArray[key] 
   const priceArrayDes = pricePlan.list|| pricePlan.list.split("\n");

   const existPlan = await PlanModel.findOne({title:pricePlan.title})
   const data = {
     title: pricePlan.title,
     plan: pricePlan.plan,
     list: priceArrayDes,
     amount: pricePlan.amount,
     btnText: pricePlan.btn,
     value: pricePlan.value,
     // status: status,
     message: pricePlan.message,
    createdBy: "6aac20710ccbed0bfdaf8131",
     year: year,
     month: month,
   };

   if (existPlan) {
     return "Plan already exist";
   } else {
    
     const newPlan = await PlanModel.create(data);
    
     const Plan = await newPlan.save();
     console.log(Plan);
    
     return "Price Plan Created Successfully"
   }
  
     
 }
  
};
createPlan()


app.use(API_PATH, authRouter);
app.use(API_PATH, usersRouter);
app.use(API_PATH, contactRouter);
app.use(API_PATH, planRouter);
app.use(API_PATH, imageRouter);
app.use(API_PATH, transactionRouter);
app.use(API_PATH, AnalyticsRouter);

// app.use(errorHandler);
app.use(async (req, res, next) => {
  res.status(404).json({
    message: "Url path Not Found, Please check Your Link",
    success: false,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
