const healthScore = require("./healthScore");
const riskScore = require("./riskScore");
const engagementScore = require("./engagementScore");
const churnPrediction = require("./churnPrediction");
const renewalPrediction = require("./renewalPrediction");
const revenueForecast = require("./revenueForecast");
const businessAdvice = require("./businessAdvice");

module.exports = {
  ...healthScore,
  ...riskScore,
  ...engagementScore,
  ...churnPrediction,
  ...renewalPrediction,
  ...revenueForecast,
  ...businessAdvice,
};
