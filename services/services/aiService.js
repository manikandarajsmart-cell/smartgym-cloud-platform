require("dotenv").config();

async function generateWorkoutWithAI(memberData) {
  const prompt = `
Create a personalized gym workout plan.

Member Details:
- Age: ${memberData.age}
- Gender: ${memberData.gender}
- Goal: ${memberData.goal}
- Experience: ${memberData.experience}
- Days Per Week: ${memberData.daysPerWeek}

Return ONLY valid JSON.

Exactly 5 workout days.

Each day must contain exactly 5 exercises.

Each exercise must contain:
- exercise
- sets
- reps

Maximum 3 short tips.

No explanations.
No markdown.
No extra text.
Keep the response under 1200 tokens.

Rules:
- Do NOT use markdown.
- Do NOT wrap the response in markdown code fences.
- Every string value must be enclosed in double quotes.
- Values like reps must be strings, for example "8-12" or "30-60 seconds".
- The response must be directly parsable using JSON.parse().

Return this exact structure:

{
  "weeklyPlan": [],
  "cardio": "",
  "warmup": "",
  "cooldown": "",
  "tips": []
}

`;

  console.log("Calling NVIDIA...");
  const response = await fetch(
    "https://integrate.api.nvidia.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.6,

      max_tokens: 2000,
      }),
    }
  );

console.log("Status:", response.status);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  const data = await response.json();
  console.log("NVIDIA finished");

  return data.choices[0].message.content;
}

module.exports = {
  generateWorkoutWithAI,
};
