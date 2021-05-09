import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes'

const app = express()

mongoose.connect(String(process.env.MONGO_URI), {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333)
