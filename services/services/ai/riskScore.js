function calculateRiskScore({
  attendanceRate = 0,
  missedPayments = 0,
  inactiveDays = 0,
}) {
  let risk = 0;

  if (attendanceRate < 60) risk += 30;
  if (attendanceRate < 40) risk += 20;

  risk += missedPayments * 15;

  if (inactiveDays > 7) risk += 15;
  if (inactiveDays > 14) risk += 20;
  if (inactiveDays > 30) risk += 25;

  risk = Math.max(0, Math.min(100, risk));

  return {
    score: risk,
    level:
      risk >= 70
        ? "High"
        : risk >= 40
        ? "Medium"
        : "Low",
  };
}

module.exports = {
  calculateRiskScore,
};

