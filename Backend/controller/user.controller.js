import pool from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function generateTokens(userId) {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
}

function setCookies(res, accessToken, refreshToken) {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const checkUserQuery = "SELECT * FROM users WHERE email=$1";
    const checkUser = await pool.query(checkUserQuery, [email]);

    if (checkUser.rows.length > 0) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userQuery =
      "INSERT INTO users (name,email,password) VALUES($1,$2,$3) RETURNING id, name, email";
    const user = await pool.query(userQuery, [name, email, hashedPassword]);

    if (user.rows.length === 0) {
      return res.status(500).json({ message: "User registration failed" });
    }

    const { accessToken, refreshToken } = generateTokens(user.rows[0].id);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({ user: user.rows[0], message: "User Created" });
  } catch (err) {
    console.error("Error in signup:", err);
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userQuery = "SELECT * FROM users WHERE email=$1";
    const userResult = await pool.query(userQuery, [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResult.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    setCookies(res, accessToken, refreshToken);

    res.status(200).json({ user, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    res.status(200).json({ message: "User Logged Out Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const refreshToken=async(req,res)=>{

    try {
        const refreshToken=req.cookies.refreshToken;
        if(!refreshToken){
              return res.status(401).json({ message: "Unauthorized, no refresh token" });
        
        }
        const decode=jwt.verify(refreshToken,process.env.JWT_SECRET);
        const newAccessToken = jwt.sign({ userId: decode.userId }, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 15 * 60 * 1000, 
        });
        res.status(200).json({ accessToken: newAccessToken, message: "Token refreshed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getProfile=async(req,res)=>{
  try {
    res.json(req.user)
  } catch (error) {
    console.log(error)
    
  }

}