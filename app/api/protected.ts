import jwt from "jsonwebtoken";

export default function handler(req, res) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: "Access granted", user: decoded });
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
}
