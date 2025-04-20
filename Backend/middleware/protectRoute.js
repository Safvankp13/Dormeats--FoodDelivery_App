import jwt from "jsonwebtoken";
import pool from "../db/db.js"; 

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized! No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(query, [decoded.userId]);
    const { password: _, ...userWithoutPassword } = result.rows[0];
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    req.user = userWithoutPassword;
    next();
  } catch (err) {
    console.error("Invalid token or database error:", err);
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

export const adminRoute=(req,res,next)=>{
  if(req.user && req.user.role=="admin")
  {
    next()
  }
  else{
    return res.status(404).json({ error:"Access Denied - Admin Only "})
  }
}



