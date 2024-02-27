const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const userroutes = require('./routes/UserRoutes')
const postroutes = require('./routes/PostRoutes')
// Load environment variables from a .env file
dotenv.config()

// middle were
app.use(cors())
app.use(express.json())

// routes
app.use("/user", userroutes)
app.use("/post", postroutes)



app.get('/', (req, res) => {
  res.send('Hello, instaagrame project is working');
});


const server = () => {
  try {
   
    mongoose.connect(process.env.MONGODBATLAS_IPADRESS).then(() => {
      app.listen(process.env.port, () => {
        console.log(`Server is running on http://localhost:${process.env.port}`)
      });
    })
  } catch (error) {
    console.log(error.message)
  }
 

}


server()


