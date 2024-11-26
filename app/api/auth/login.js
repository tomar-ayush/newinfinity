import jwt from "jsonwebtoken";

export default function handler(req, res) {
    const { email, password } = req.body;

    // Replace with database/user validation logic
    if (email === "user@example.com" && password === "password123") {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ token });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
}
