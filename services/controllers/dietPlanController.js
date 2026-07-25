const DietPlan = require("../models/DietPlan");

exports.getDietPlans = async (req, res) => {
  try {
    const plans = await DietPlan.find().sort({ createdAt: -1 });

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

exports.createDietPlan = async (req, res) => {
  try {
    const plan = await DietPlan.create({
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

exports.updateDietPlan = async (req, res) => {
  try {
    const plan = await DietPlan.findByIdAndUpdate(
      req.params.id,
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
      { new: true }
    );

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

exports.deleteDietPlan = async (req, res) => {
  try {
    await DietPlan.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Diet Plan Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
