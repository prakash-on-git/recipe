require("dotenv").config();

const featureFlagMiddleware = (req, res, next) => {
  const { url, method } = req;

  // Apply feature flag only on the registration route with POST method
  if (url === "/auth/register" && method === "POST") {
    const ALLOW_REGISTRATION = process.env.ALLOW_REGISTRATION_FLAG === "true";

    if (!ALLOW_REGISTRATION) {
      return res.status(403).json({ message: "User registration is currently disabled." });
    }
  }

  next();
};

module.exports = featureFlagMiddleware;
