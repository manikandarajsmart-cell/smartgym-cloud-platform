function generateBusinessAdvice({
  healthScore,
  riskScore,
  engagementScore,
}) {
  const advice = [];

  if (healthScore.score < 60) {
    advice.push("Improve member attendance through follow-up calls.");
  }

  if (riskScore.score > 60) {
    advice.push("Contact high-risk members within the next 48 hours.");
  }

  if (engagementScore.score < 50) {
    advice.push("Introduce fitness challenges and trainer check-ins.");
  }

  if (advice.length === 0) {
    advice.push("Gym performance looks healthy. Maintain current engagement strategies.");
  }

  return advice;
}

module.exports = {
  generateBusinessAdvice,
};
