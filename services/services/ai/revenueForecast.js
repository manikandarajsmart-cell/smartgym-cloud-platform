function calculateRevenueForecast({
  monthlyRevenue = 0,
  growthRate = 0,
}) {
  const forecast = Math.round(
    monthlyRevenue * (1 + growthRate / 100)
  );

  return {
    currentRevenue: monthlyRevenue,
    growthRate,
    forecastRevenue: forecast,
  };
}

module.exports = {
  calculateRevenueForecast,
};
