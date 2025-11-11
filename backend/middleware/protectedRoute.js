import jwt from 'jsonwebtoken';
import user from "../models/userModel.js";

export const protecteRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("You need to log in first");

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) return res.status(401).send("Invalid token, please sign up or log in");

    const userFind = await user.findById(decode.userId).select('-password');
    if (!userFind) return res.status(404).send("User not found");

    req.user = userFind;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};