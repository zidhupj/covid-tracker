const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{

    // Checking for web token
    console.log('Request recieved...checking for web token...');
    const token = req.header('auth-token');
    if(!token){
        console.log(`No web token found...Acess denied...`);
        return res.status(401).send('Access Denied...');
    }
    console.log(`Token available...`);

    //verify web token
    console.log(`Verifying webtoken...`);
    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verified;
        console.log(`Token is verified to be authentic...`);
        next();
    }
    catch(err){
        console.log(`Unauthentic Web Token...Acess denied...`);
        return res.status(400).send('Invalid Token');
    }
}