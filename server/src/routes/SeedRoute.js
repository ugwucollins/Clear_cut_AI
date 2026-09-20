import express from 'express';
import { createPlan } from './../../seed.js';

const seedRouter = express.Router();

seedRouter.get('/seed-database', async (req, res) => {
  // 1. Secure it with a secret key token from environment variables
  const { secret } = req.query;
  
  if (secret !== process.env.SEED_SECRET_KEY) {
    return res.status(401).json({ success: false, message: "Unauthorized access" });
  }

  try {
    // 2. Execute your function
    await createPlan();
    return res.status(200).json({ success: true, message: "Database seeded successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default seedRouter;
