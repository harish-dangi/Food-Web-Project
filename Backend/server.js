import dotenv from 'dotenv'
dotenv.config();
import connectDB from '../Backend/config/DB.js'
import app from'./app.js'

const port = process.env.PORT || 5000
connectDB();
app.listen(port,(req,res)=>{
  console.log(`server is running in port : ${port}`)

})


