import jwt from 'jsonwebtoken';

export const gernateToken = (userId, res)=>{
   const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
});
}