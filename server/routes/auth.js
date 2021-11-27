const express = require('express')
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation,loginValidation} = require('../validation');


//router middlewares
router.use(express.json());


//Registrations
router.post('/register',async (req,res)=>{
    console.log('Recieved user details from registration request...');

    //Validating user information
    console.log('Validating user data') 
    const {error}=registerValidation(req.body);
    if(error){
        console.log('An error was found.');
        return res.status(400).send(error.details[0].message);
    }
    console.log('No error found...');

    //Checking if user is already in Database
    console.log('Checking if user already registered');
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist){
        console.log('Found that user already registered..\nRegistration terminated...');
        return res.status(400).send('Email already exists');
    }


    // HASH PASSWORD
    console.log('Hashing the password using bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);


    //Database data entry
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })
    try{
        console.log('Data successfully entered into database');
        const savedUser = await user.save();
        res.send({user:user._id});
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

//Login
router.post('/login',async (req,res)=>{

    console.log('Recieved user details from login request...');

    //Validating user information
    console.log('Validating user data') 
    const {error}=loginValidation(req.body);
    if(error){
        console.log(`credentials are not valid`);
        return res.status(400).send(error.details[0].message);
    }
    console.log('No error found...');

    //Checking if the account exists
    console.log('Checking if account exists');
    const user = await User.findOne({email: req.body.email});
    if(!user){
        console.log(`Account doesn't exist`);
        return res.status(400).send(`Account doesn't exist`);
    }

    // Check if password is correct
    console.log(`Checking if password is correct`);
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass){
        console.log(`Incorrect Password....Terminate Login`);
        return res.status(400).send('Invalid Password');
    }

    //Create and assign a token
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);

    res.header('auth-token', token).send(token);
    console.log(`Login succssful`);
})

module.exports = router;