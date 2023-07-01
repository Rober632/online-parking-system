require("./db/dbConnect")
require("dotenv").config();
const express = require("express")
const userRoutes = require('./routes/userRoutes')
const parkingRoutes = require('./routes/parkingRoutes')

const app = express()
const  cors = require('cors');

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(userRoutes)
app.use('/parking' , parkingRoutes)
app.listen( process.env.PORT , () => console.log(`you are on http://localhost:${process.env.PORT}`))
