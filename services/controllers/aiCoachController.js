const { generateWorkoutWithAI } = require("../services/aiService");

// ===============================
// AI Workout Generator
// ===============================
exports.generateWorkout = async (req, res) => {
console.log("=== AI WORKOUT ROUTE HIT ===");
console.log(req.body);

  try {
    const {
      age,
      gender,
      goal,
      experience,
      daysPerWeek,
    } = req.body;

    if (!age || !gender || !goal || !experience || !daysPerWeek) {
      return res.status(400).json({
        success: false,
        message: "All workout details are required.",
      });
    }

const aiResponse = await generateWorkoutWithAI({
  age,
  gender,
  goal,
  experience,
  daysPerWeek,
});

console.log("STEP 1 - AI response received");

console.log("===== RAW AI RESPONSE =====");
console.log(aiResponse);
console.log("===========================");

   let workoutPlan;

try {
  const cleanResponse = aiResponse
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

const fixedResponse = cleanResponse
  .replace(/"reps":\s*([0-9]+-[0-9]+)/g, '"reps":"$1"')
  .replace(/"reps":\s*([0-9]+-[0-9]+\s*seconds)/g, '"reps":"$1"');

if (!fixedResponse.trim().endsWith("}")) {
  throw new Error("AI response truncated.");
}

workoutPlan = JSON.parse(fixedResponse);
console.log("STEP 2 - JSON parsed");

} catch (error) {
  console.error("JSON Parse Error:", error.message);
  console.log("===== RAW AI RESPONSE =====");
  console.log(aiResponse);
  console.log("===========================");

  return res.status(500).json({
    success: false,
    message: "AI returned an invalid JSON response.",
    rawResponse: aiResponse,
  });
}

    workoutPlan.memberProfile = {
      age,
      gender,
      goal,
      experience,
      daysPerWeek,
    };

      workoutPlan.generatedAt = new Date();

console.log("STEP 3 - Sending response");

return res.status(200).json({
      success: true,
      message: "Workout plan generated successfully.",
      workoutPlan,
    });

  } catch (error) {
    console.error("Workout AI Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate workout plan.",
      error: error.message,
    });
  }
};

// ===============================
// AI Diet Generator (Keep Existing)
// ===============================
exports.generateDiet = async (req, res) => {
  try {
    const {
      age,
      gender,
      goal,
    } = req.body;

    const dietPlan = {
      memberProfile: {
        age,
        gender,
        goal,
      },
      calories: 2500,
      protein: "160g",
      carbs: "300g",
      fats: "70g",
      meals: [
        {
          meal: "Breakfast",
          foods: ["Oats", "Eggs", "Banana"],
        },
        {
          meal: "Lunch",
          foods: ["Rice", "Chicken Breast", "Vegetables"],
        },
        {
          meal: "Dinner",
          foods: ["Fish", "Sweet Potato", "Salad"],
        },
      ],
      waterIntake: "3 Liters",
      tips: [
        "Eat every 3-4 hours.",
        "Avoid sugary drinks.",
        "Consume enough protein daily.",
      ],
      generatedAt: new Date(),
    };

    return res.status(200).json({
      success: true,
      message: "Diet plan generated successfully.",
      dietPlan,
    });

  } catch (error) {
    console.error("Diet AI Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate diet plan.",
      error: error.message,
    });
  }
};
