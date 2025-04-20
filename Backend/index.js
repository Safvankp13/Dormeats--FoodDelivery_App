import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from 'helmet'
import userRoutes from "./routes/user.Routes.js"
import productRoutes from "./routes/product.Routes.js"
import cartRoutes from "./routes/cart.routes.js"
import menuRoutes from "./routes/menu.Routes.js"
import membershipRoutes from "./routes/membership.Routes.js"

import path from "path";
import morgan from "morgan";
dotenv.config();
const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(morgan("common"))
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true, 
}));
app.use(cookieParser());


const PORT = process.env.PORT ;
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"),));

app.use("/api/auth",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/menu",menuRoutes)
app.use("/api/membership",membershipRoutes)


app.listen(PORT, () => {
    console.log(`API working on port ${PORT}!`);
});
