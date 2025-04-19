import { verifyToken } from "../utils/jwt.js";

const adminAuth = async (req, res, next) => {
  const token = req.cookies.admin_auth_token;
  try {
    if (token) {
      const payload = await verifyToken(token, process.env.JWT_SECRET_KEY);

      if (
        payload.email === process.env.ADMIN_EMAIL &&
        payload.password === process.env.ADMIN_PASSWORD
      ) {
        req.token = token;
        return next();
      }
    }

    return res.json({ success: false, message: "Invalid token" });
  } catch (err) {
    return res.json({ success: false, message: "Authorization failed" });
  }
};

export default adminAuth;
