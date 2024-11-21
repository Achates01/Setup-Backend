import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.user(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//routes import

import userRouter from './routes/user.routes.js'

export { app }