import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { month, year } from './src/connection/TimeExporter.js';
import PlanModel from './src/model/PlanModel.js';

dotenv.config();

const PriceArray = [
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

export const createPlan = async () => {
  // Flag to track if we opened a new connection just for this script execution
  let openedOwnConnection = false;

  try {
    // If mongoose isn't connected yet (readyState 0 = disconnected), connect manually
    if (mongoose.connection.readyState === 0) {
      const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/your-db-name";
      console.log("⏳ Connecting to MongoDB...");
      await mongoose.connect(MONGODB_URL);
      console.log("✅ MongoDB Connected.");
      openedOwnConnection = true;
    }

    console.log("🚀 Starting Price Plan seeding...");
    
    // Loop through each plan element properly using for...of
    for (const pricePlan of PriceArray) {
      console.log(`📝 Processing Price Plan "${pricePlan.title}"...`);
      
      // Check if plan already exists by its unique title
      const existPlan = await PlanModel.findOne({ title: pricePlan.title });

      if (existPlan) {
        console.log(`ℹ️ Plan "${pricePlan.title}" already exists. Skipping.`);
        continue; 
      }

      const data = {
        title: pricePlan.title,
        plan: pricePlan.plan,
        list: pricePlan.list, 
        amount: pricePlan.amount,
        btnText: pricePlan.btn,
        value: pricePlan.value,
        message: pricePlan.message,
        path: pricePlan.path,          
        createdBy: "6aac20710ccbed0bfdaf8131", 
        year: year,
        month: month,
      };

      // PlanModel.create inserts and saves the document automatically
      const newPlan = await PlanModel.create(data);
      console.log(`✅ Price Plan "${newPlan.title}" Created Successfully.`);
    }
    
    console.log("🎉 Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding price plans:", error);
  } finally {
    // Clean up connection ONLY if this script manually opened it
    if (openedOwnConnection) {
      await mongoose.disconnect();
      console.log("🔌 Disconnected from MongoDB.");
      process.exit(0);
    }
  }
};

// Execute the function
createPlan();
