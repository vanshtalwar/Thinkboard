import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import path, { join } from 'path'


import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config()


const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

app.use(express.json())
app.use(rateLimiter)
app.use(cors())

app.use("/api/notes", notesRoutes)

app.use(express.static(path.join(__dirname, "../Frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started at Port:", PORT);
    })
})
