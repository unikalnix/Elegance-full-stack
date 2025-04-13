import { verifyToken, genToken } from "../utils/jwt.js";

const adminAuth = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (token) {
      const payload = await verifyToken(token, process.env.JWT_SECRET_KEY);

      if (
        payload.email === process.env.ADMIN_EMAIL &&
        payload.password === process.env.ADMIN_PASSWORD
      ) {
        return next();
      }
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "All fileds are required" });
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const newToken = await genToken(
        { email, password },
        process.env.JWT_SECRET_KEY
      );

      res.cookie("token", newToken);

      return next();
    }

    return res.json({ success: false, message: "Invalid admin credentials" });
  } catch (err) {
    return res.json({ success: false, message: "Authorization failed" });
  }
};

export default adminAuth;
