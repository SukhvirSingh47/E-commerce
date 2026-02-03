import jwt from 'jsonwebtoken';
import User from "../models/user.js";
export const authMiddleware = (req, res, next) => {
  //get token from header
  const authHeader = req.headers.authorization;
  //check if not token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'no token, authorization denied' });
  }
  //get token
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id }
    next();
  }
  catch (error) {
    console.error("error in auth middleware", error);
    res.status(401).json({ message: 'token is not valid' });
  }

}
export const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("role");
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }
    next();
  } catch (error) {
    console.error("error in admin middleware", error);
    res.status(500).json({ message: 'server error' });
  }
}