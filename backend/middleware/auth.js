const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const token = req.headers.authorization;
    
    if (!token) return res.status(403).json({ message: "Authorization header required", success: false });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error in authMiddleware:", error);
        res.status(401).json({ message: "Something went wrong", success: false, error: error.message });
    }
}

module.exports = authMiddleware;
