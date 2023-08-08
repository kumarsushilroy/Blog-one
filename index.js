
const express = require('express');
const connect = require('./Db/Connection');
const cors = require('cors');
const UserRoute = require('./Routes/UserRoutes');
const blogRoute = require('./Routes/BlogRoutes');
const path = require('path')
const dotenv = require('dotenv')
dotenv.config();


const port = process.env.PORT || 4000

const app = express();


// middleware.........................
app.use(express.json()); 
app.use(cors());
app.use(UserRoute);
app.use(blogRoute);
app.use(express.static(path.join(__dirname,'./client/dist')));


// app.get('/get', (req,res)=>{
//     res.send({message:'success'})
// })

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./client/dist/index.html'))
})

app.listen(port, ()=>{
    connect();
})