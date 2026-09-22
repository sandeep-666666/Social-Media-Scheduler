import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import socialAuthRouter from "./routes/socialAuthRoutes.js";
import accountRouter from "./routes/accountRouts.js";
import postRouter from "./routes/postRouts.js";
import activityRouter from "./routes/activityRoutes.js";
import { initScheduler } from "./services/schedulerService.js";

const app = express();

//database Connection
await connectDB()

// Middleware
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
    res.send('Server is Live!');
});

//Adding routes
app.use("/api/auth",authRouter)
app.use("/api/oauth",socialAuthRouter)
app.use("/api/accounts",accountRouter)
app.use("/api/activity",activityRouter)

//Initializing scheduler
initScheduler();

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction)=>{
    console.error(err)
    res.status(500).send(
        err?.response?.data?.message || err?.message
    )
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});