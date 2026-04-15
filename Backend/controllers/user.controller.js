const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password , mobileno} = req.body;

    const isUserAlready = await userModel.findOne({ email });

    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        mobileno
    });

    const token = user.generateAuthToken();
    res.cookie('token',token,{
  httpOnly: true,
  sameSite: "none",
  secure: false
})

    res.status(201).json({  user });


}




module.exports.loginUser =async (req, res)=>{
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
            }
    const {email,password} = req.body;
   
    
    const user =await userModel.findOne({ email }).select("+password"); 
    
    if(!user){
         return res.status(401).json({ message: 'Invalid Email or password'});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({ message: 'Inavalid email or password'});
    }

    const token = user.generateAuthToken();

res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
});

    res.status(200).json({ user });   
}

module.exports.getUserProfile = async (req,res) => {  
      res.status(200).json(req.user);
}

module.exports.updateUserProfile = async(req,res) =>{
     try{
        const userId = req.user._id;

        const {firstname , lastname} = req.body;

        let updateData = {
            fullname:{
                firstname,
                 lastname
            }
        }

        if(req.file){
            updateData.profileImage = `/uploads/user/${req.file.filename}`
        }

        const user = await userModel.findByIdAndUpdate(
            userId,updateData,{new:true}
        )

        res.status(200).json({user})
     }catch(err){
        res.status(500).json({message:'updation faild',err:err.message})
     }
}



module.exports.logoutUser = async (req, res) => {
    
    const token = req.cookies.token  

    if(token){
    await blackListTokenModel.create({ token });
    }
    
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
});
    res.status(200).json({ message: 'Logged out' });
 

}

