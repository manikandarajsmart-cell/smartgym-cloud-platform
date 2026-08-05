function calculateHealthScore({
  attendanceRate = 0,
  paymentStatus = true,
  engagementScore = 0,
}) {
  let score = 50;

  score += attendanceRate * 0.3;
  score += engagementScore * 0.2;

  if (paymentStatus) {
    score += 20;
  } else {
    score -= 20;
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  return {
    score,
    level:
      score >= 80
        ? "Excellent"
        : score >= 60
        ? "Good"
        : score >= 40
        ? "Average"
        : "Poor",
  };
}

module.exports = {
  calculateHealthScore,
};
