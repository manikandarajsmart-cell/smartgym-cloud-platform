import { Router } from "express";

const router = Router();

router.get("/stats", async (_req, res) => {
  try {
    res.json({
      totalMembers: 1284,
      activeTrainers: 18,
      monthlyRevenue: 24500,
      growthRate: 12,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard stats",
    });
  }
});

export default router;
