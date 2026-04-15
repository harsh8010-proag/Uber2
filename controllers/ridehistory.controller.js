const rideModel = require("../models/ride.model")


module.exports.getUserRideHistory = async (req, res) =>{

 try{
    const rides = await rideModel.find({
        user: req.user._id,
        status:{$in:['completed','cancelled']}
    }).populate('captain').sort({createdAt: -1});
 
    
    res.status(200).json(rides);
 } catch(err){
    res.status(500).json({message:'server error'});
 }

}

module.exports.getCaptainRideHistory = async (req, res) =>{
    try{
        const rides = await rideModel.find({
            captain:req.captain._id,
            status:{$in :['completed','cancelled']}
        }).populate('user').sort({ createdAt : -1});

        res.status(200).json(rides)
    }catch(err){
        res.status(500).json({message:'server error'});
    }
}
























