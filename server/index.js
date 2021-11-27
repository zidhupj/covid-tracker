const express = require('express')
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors');
dotenv.config()


// Routes
const authRoute = require('./routes/auth')

// Route middlewares
app.use('/api/user',authRoute);

//middlewares
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5000'
}));

app.post('/',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
})


// connect to database
// listen to port
mongoose.connect(process.env.DB_CONNECT,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
},()=>{
    console.log('Database connection established');
    app.listen(3000,'127.0.0.1' ,()=>{
        console.log('Server is listening on port 3000');
    })
});


