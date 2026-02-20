import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    console.log("PROTECT HIT");

    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:", authHeader);

    // ❌ No header
    if (!authHeader) {
      return res.status(401).json({ message: "No authorization header" });
    }

    // ❌ Not Bearer
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid auth format" });
    }

    // ✅ Extract ONLY the token
    const token = authHeader.split(" ")[1];

    // ❌ token missing / bad
    if (!token || token === "null" || token === "undefined") {
      return res.status(401).json({ message: "Token missing" });
    }

    // ✅ VERIFY ONLY JWT STRING
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (error) {
    console.error("JWT ERROR:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};