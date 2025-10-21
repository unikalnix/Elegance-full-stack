import { verifyToken } from "../utils/jwt.js";

const adminAuth = async (req, res, next) => {
  const token = req.cookies?.admin_auth_token || req.cookies?.user_auth_token;
  if (!token)
    return res.status(401).json({ success: false, message: "No token found" });

  try {
    const payload = await verifyToken(token, process.env.JWT_SECRET_KEY);
  

    if (
      payload.email === process.env.ADMIN_EMAIL &&
      payload.password === process.env.ADMIN_PASSWORD
    ) {
      req.token = token;
      req.isAdmin = true;
      return next();
    }

    if (
      payload.email === process.env.USER_EMAIL &&
      payload.password === process.env.USER_PASSWORD
    ) {
      req.token = token;
      req.isAdmin = false;
      return next();
    }

    return res.status(403).json({ success: false, message: "Invalid token" });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Authorization failed" });
  }
};

export default adminAuth;
