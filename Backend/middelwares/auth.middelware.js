import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    // console.log(`Authorization Header: ${authHeader}`);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Token Missing"
        });
    }
    const token = authHeader.split(" ")[1];
    // console.log(`Token: ${token}`);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = {
            _id: decoded.userId,
            email: decoded.email
        };
        next();
    } catch (err) {
        console.log("JWT Error:", err);
        return res.status(401).json({
            success: false,
            message: err.message
        });
    }
};

export default authMiddleware;