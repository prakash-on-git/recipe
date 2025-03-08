const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;    

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Invalid authorization header format", success: false });
    }

    const token = authHeader.split(" ")[1]; // Extract the actual token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        console.log("Decoded JWT Payload:", decoded);
        next();
    } catch (error) {
        console.error("Error in authMiddleware:", error);
        res.status(401).json({ message: "Something went wronggg", success: false, error: error.message });
    }
}

module.exports = authMiddleware;
