import { admin } from "../config/firebase.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                error: "Token not provided"
            });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                error: "Invalid token format"
            });
        }
        const decodedToken = await admin
            .auth()
            .verifyIdToken(token);
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name,
        };
        next();

    } catch (error) {

        return res.status(401).json({
            error: "Invalid or expired token"
        });

    }
};