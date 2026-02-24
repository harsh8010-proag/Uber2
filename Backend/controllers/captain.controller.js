 const captainModel = require('../models/captain.model'); 
 const captainService = require('../services/captain.service'); 
 const { validationResult } = require('express-validator'); 
 const blackListTokenModel = require('../models/blacklistToken.model');
 const rideModel = require('../models/ride.model')
 const fs = require('fs');
 const path = require('path');

 
 
 module.exports.registerCaptain = async (req, res, next)=>{ 

    const errors = validationResult(req); 
    if(!errors.isEmpty()){ 
        return res.status(400).json({ errors: errors.array() }); 
    } 
 
    const { fullname, email, password, vehicle } = req.body; 
 
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
        vehicleType: vehicle.vehicleType 
    }); 

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain});
 }


module.exports.loginCaptain = async (req,res,next) =>{
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
const isMatch = await captain.comparePassword(password);
if(!isMatch){
    return res.status(401).json({
        message:'Invalid email or password'
    });

} 
const token = captain.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({
    token , captain
    });}

 module.exports.getCaptainProfile = async (req, res, next) => {

     

    res.status(200).json({
        captain: req.captain,
        
    })
 };

 module.exports.updateCaptainProfile = async (req, res, next) => {
    try {
        const captainId = req.captain._id;
        const { fullname, vehicle, profileImage: profileImageBase64 } = req.body;
        let profileImagePath = null;

        if (profileImageBase64 && typeof profileImageBase64 === 'string' && profileImageBase64.startsWith('data:image/')) {
            const uploadsDir = path.join(__dirname, '..', 'uploads', 'captain');
            if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
            const match = profileImageBase64.match(/^data:image\/(\w+);base64,(.+)$/);
            const ext = match ? (match[1] === 'jpeg' ? 'jpg' : match[1]) : 'png';
            const filename = `${captainId}-${Date.now()}.${ext}`;
            const filePath = path.join(uploadsDir, filename);
            const base64Data = (match && match[2]) || profileImageBase64.split(',')[1];
            if (base64Data) {
                fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
                profileImagePath = `/uploads/captain/${filename}`;
            }
        }

        const updates = {};
        if (fullname) updates.fullname = fullname;
        if (vehicle) updates.vehicle = vehicle;
          

        const captain = await captainService.updateCaptainProfile(captainId, updates, profileImagePath);

       

        res.status(200).json({ captain });
    } catch (err) {
        next(err);
    }
 };

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message:'Logout successfully'});
}