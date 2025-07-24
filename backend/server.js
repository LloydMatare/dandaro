import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

const PORT = process.env.PORT

app.listen(PORT,() => {
    console.log(`Server started at ${PORT}`);
    
})