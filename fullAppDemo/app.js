import express from 'express'
import path from 'path'
import 'dotenv/config'
import taskRoutes from './routes/tasks.js'
import cors from 'cors'

// set the local path
const __dirname = path.resolve()

const app = express()
// this could be anything!
const PORT = 3000

// set up to serve static files from public
// this will serve the static files at the base (/) route
app.use(express.static(path.join(__dirname, 'public')))

//NOTE: we needed to added express.json as middleware to parse the body 
app.use(express.json())

//Nnable CORS to allow React Native to make requests to Express
app.use(cors());

//routes
taskRoutes(app)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})