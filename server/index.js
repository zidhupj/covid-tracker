const express = require('express')
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors');
dotenv.config()


// Routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const adminRoute = require('./routes/admin')
const articleRoute = require('./routes/article')

// Route middlewares
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/article', articleRoute);

//middlewares
app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
}));

app.post('/', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})


// connect to database
// listen to port
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
}, () => {
    console.log('Database connection established');
    app.listen(5000, '127.0.0.1', () => {
        console.log('Server is listening on port 5000');
    })
});


