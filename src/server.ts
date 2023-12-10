import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors' 
import router from './router/routes'


dotenv.config()

const app = express(); 

app.use(cors()); 

app.use(express.json())

app.use(router)

app.listen(5000, () => console.log(`server running on ${process.env.PORT}`))

module.exports = app