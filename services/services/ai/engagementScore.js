function calculateEngagementScore({
  attendanceRate = 0,
  workoutsCompleted = 0,
  checkIns = 0,
}) {
  let score = 0;

  score += attendanceRate * 0.5;
  score += workoutsCompleted * 2;
  score += checkIns;

  score = Math.min(100, Math.round(score));

  return {
    score,
    level:
      score >= 80
        ? "Excellent"
        : score >= 60
        ? "Good"
        : score >= 40
        ? "Average"
        : "Low",
  };
}

module.exports = {
  calculateEngagementScore,
};
