 const captainModel = require('../models/captain.model'); 
 const captainService = require('../services/captain.service'); 
 const { validationResult } = require('express-validator'); 
 const blackListTokenModel = require('../models/blacklistToken.model');
 const rideModel = require('../models/ride.model')
 const fs = require('fs');
 const path = require('path');

 
 
 module.exports.registerCaptain = async (req, res)=>{ 

    const errors = validationResult(req); 
    if(!errors.isEmpty()){ 
        return res.status(400).json({ errors: errors.array() }); 
    } 
 
    const { fullname, email, password, vehicle ,mobileno } = req.body; 
    console.log(mobileno)
 
    const isCapatinAlreadyExist = await captainModel.findOne({ email }); 
 
    if(isCapatinAlreadyExist){ 
        return res.status(400).json({ 
            message:'Captain already exist' 
        }); 
    } 
  

    const hashedPassword = await captainModel.hashPassword(password); 
 
    const captain = await captainService.createCaptain({ 
        firstname: fullname.firstname, 
        lastname : fullname.lastname, 
        email, 
        password: hashedPassword, 
        color : vehicle.color, 
        plate : vehicle.plate, 
        capacity: vehicle.capacity, 
        vehicleType: vehicle.vehicleType ,
        mobileno: mobileno
    }); 
 
    captain.status = "active";
    await captain.save();
    const token = captain.generateAuthToken();

res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
});

    res.status(201).json({captain});
 }


module.exports.loginCaptain = async (req,res) =>{
    const errors = validationResult(req); 
  

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }
const {email, password} = req.body; 

const captain = await captainModel.findOne({
    email
}).select('+password');

if(!captain){
    return res.status(401).json({
        message: 'Incalid email or password'    
    });
}

captain.status = 'active';
await captain.save();


const isMatch = await captain.comparePassword(password);
if(!isMatch){
    return res.status(401).json({
        message:'Invalid email or password'
    });

} 
const token = captain.generateAuthToken();

res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
});

    res.status(200).json({
     captain
    });
}

 module.exports.getCaptainProfile = async (req, res) => {

     

    res.status(200).json({
        captain: req.captain,
        
    })
 };


 module.exports.updateCaptainProfile = async (req, res) =>{

  try{
  const captainId = req.captain._id;

  const {
    firstname,lastname,color,plate,capacity,vehicleType
  } = req.body;

 
  let updateData = {
    fullname:{
        firstname,
        lastname,
    },
    vehicle:{
        color,
        plate,
        capacity,
        vehicleType
    }
  }

  if(req.file){
    updateData.profileImage = `/uploads/captain/${req.file.filename}`;
   
  }

  const captain = await captainModel.findByIdAndUpdate(
    captainId,
    updateData,
    { new : true}
  );

  res.status(200).json({captain});
  }catch(error){
      res.status(400).json({message:error.message});
  }


 }
  

module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token  

    await blackListTokenModel.create({ token });

    await captainModel.findByIdAndUpdate(req.captain._id,{
        status : 'inactive',
        socketId: null
    });

    res.clearCookie('token',{httpOnly:true});

    res.status(200).json({ message:'Logout successfully'});
}