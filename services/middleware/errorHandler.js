// SmartGym Cloud - Global Error Handler

module.exports = (err, req, res, next) => {
  console.error("========== API ERROR ==========");
  console.error(err.stack || err);
  console.error("================================");

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
