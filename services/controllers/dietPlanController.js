const DietPlan = require("../models/DietPlan");

// ===================================
// Get Diet Plans
// ===================================
exports.getDietPlans = async (req, res) => {
  try {

    const query = {};

    if (req.tenant?.organizationId) {
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      query.gymId = req.user.gymId;
    }

    const plans = await DietPlan.find(query).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      plans,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ===================================
// Create Diet Plan
// ===================================
exports.createDietPlan = async (req, res) => {
  try {

    const plan = await DietPlan.create({

// Legacy
gymId: req.user?.gymId || null,

      // Multi-tenant
      organizationId: req.tenant?.organizationId || null,
      branchId: req.tenant?.branchId || null,

      memberName: req.body.memberName,
      breakfast: req.body.breakfast,
      lunch: req.body.lunch,
      snacks: req.body.snacks,
      dinner: req.body.dinner,
      calories: Number(req.body.calories || 0),
      protein: Number(req.body.protein || 0),
      carbs: Number(req.body.carbs || 0),
      fat: Number(req.body.fat || 0),
      water: req.body.water,

    });

    res.json({
      success: true,
      plan,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ===================================
// Update Diet Plan
// ===================================
exports.updateDietPlan = async (req, res) => {
  try {

    const query = {
      _id: req.params.id,
    };

    if (req.tenant?.organizationId) {
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      query.gymId = req.user.gymId;
    }

    const plan = await DietPlan.findOneAndUpdate(
      query,
      {
        memberName: req.body.memberName,
        breakfast: req.body.breakfast,
        lunch: req.body.lunch,
        snacks: req.body.snacks,
        dinner: req.body.dinner,
        calories: Number(req.body.calories || 0),
        protein: Number(req.body.protein || 0),
        carbs: Number(req.body.carbs || 0),
        fat: Number(req.body.fat || 0),
        water: req.body.water,
      },
      {
        new: true,
      }
    );

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Diet plan not found",
      });
    }

    res.json({
      success: true,
      plan,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ===================================
// Delete Diet Plan
// ===================================
exports.deleteDietPlan = async (req, res) => {
  try {

    const query = {
      _id: req.params.id,
    };

    if (req.tenant?.organizationId) {
      query.organizationId = req.tenant.organizationId;
    } else if (req.user?.gymId) {
      query.gymId = req.user.gymId;
    }

    const plan = await DietPlan.findOneAndDelete(query);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Diet plan not found",
      });
    }

    res.json({
      success: true,
      message: "Diet plan deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
