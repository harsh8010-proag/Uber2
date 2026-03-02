const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/mpas.service');
const { sendMessageToSocketId, getIO } = require('../socket');
const rideModel = require('../models/ride.model');
const captainModel = require('../models/captain.model');

module.exports.createRide = async (req , res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        });
    }

    const {pickup,destination,vehicleType,paymentMethod} = req.body;
 
    try{
 


        const activeRide = await rideModel.findOne({
          user:req.user._id,
          status:{$in:['pending','accepted','ongoing']}
        });

        if(activeRide){
            return res.status(400).json({
                message:'you already have an acive ride'
            })
        }
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType,paymentMethod});
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
     

        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 30,vehicleType);
           
        if(captainsInRadius.length === 0){
            ride.status = 'cancelled'
            await ride.save();

            return res.status(404).json({
                message: 'No captains available nearby'
            })
        }
        // console.log(captainsInRadius);

        ride.otp = "";
        
        const rideWithUser = await rideModel.findOne({ _id: ride._id}).populate('user');
        
        
        captainsInRadius.map(captain =>{

            sendMessageToSocketId(captain.socketId,{
                event: 'new-ride',
                data: rideWithUser
            })
        })         

        
      return res.status(201).json(ride);

    }catch(err){
        console.log(err);
        return res.status(500).json({ message: err.message});
    }
};


module.exports.getFare = async (req,res) =>{

    const errors = validationResult(req);
    if(! errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {pickup, destination} = req.query;

    try{
        const fare = await rideService.getFare(pickup,destination);
        return res.status(200).json(fare);
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports.confirmRide = async (req,res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {rideId} = req.body;

    try{
    const ride = await rideService.confirmRide({rideId,captain: req.captain});
    const io=getIO();
    sendMessageToSocketId(ride.user.socketId,{
        event: 'ride-confirmed',
        data: ride
    })
     
    io.to('captains').emit('ride-taken',{
        rideId : ride._id
    });
    
    //   console.log(ride);
    return res.status(200).json(ride);
   
    }catch(err){
    
 
    return res.status(500).json({
        message : err.message 
    })

    }

}


module.exports.startRide = async (req, res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }                               

    const {rideId, otp} = req.query;

    try{
        const ride = await rideService.startRide({
            rideId, otp, captain:req.captain
        })
 
       sendMessageToSocketId(ride.user.socketId,{
        event:'ride-started',
        data:ride
       });

       return res.status(200).json(ride);
    }catch(err){
       return res.status(500).json({
        message: err.message
       })
    }
}

module.exports.cancelRide = async(req, res) =>{
   const {rideId} = req.query;

   try{
        const ride = await rideService.cancelRide({
            rideId,   captain:req.captain
        })
   
       sendMessageToSocketId(ride.user.socketId,{
        event:'ride-canceled',
        data:ride
       });

       return res.status(200).json(ride);
    }catch(err){
       return res.status(500).json({
        message: err.message
       })
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

        const {rideId} = req.body;

        try{
            const ride = await rideService.endRide({rideId,captain:req.captain});

            sendMessageToSocketId(ride.user.socketId,{
                event: 'ride-ended',
                data: ride       
            });

            return res.status(200).json(ride);
        }catch(err){
            return res.send(err)
        }
    
    
}

module.exports.getPendingPayment = async (req, res) =>{

    try{
     const ride = await rideModel.findOne({
        user:req.user._id,
        status:'completed',
        paymentStatus:'pending',
        paymentMethod:'upi'
     }).sort({createAt: -1}).populate('user') ;

              sendMessageToSocketId(ride.user.socketId,{
                event: 'ride-pending',
                data: ride       
            });  

     if(!ride){
        return res.json({
            pending:false
        })  }

        res.json({
            pending:true,
            ride
        })
    }catch(err){
        return res.send(err)
    }
}

module.exports.payRide= async (req,res) =>{
     
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
               errors: errors.array()
            })
        }
 
  
    const {rideId} = req.body;
     try{
    const ride = await rideModel.findOneAndUpdate({
             _id:rideId
         },{
             paymentStatus: 'paid'
         },
        { new: true }).populate('captain');
 
    
    await captainModel.findByIdAndUpdate(ride.captain._id,{
         $inc: { totalEarnings: ride.fare}
   });
   
        if (!ride) {
   return res.status(404).json({
       message: "Ride not found"
   });
}
         res.json({
            success:true,
            message:'payment successful'
         })


     }catch(err){
   console.log("ERROR:", err);
   return res.status(500).json({ 
       message: err.message 
   });
}
}


module.exports.getCaptaininCurrentRide = async (req,res) =>{
             
    const assigenedRide = await rideModel.findOne({
        captain: req.captain._id,
        status : {$nin : ['completed','cancelled']}
    }).populate('captain').populate('user');

    if(assigenedRide){
          return res.status(200).json(assigenedRide);
    }
    
   const pendingRide = await rideModel.findOne({
         status: 'pending'
    }).populate('user').sort({ createdAt: -1 });
 
        if(pendingRide){  return res.status(200).json(pendingRide);
    }

    if(!assigenedRide && !pendingRide ){
        return res.status(404).json({
            message: 'No active ride'
        });
    }

   
};

 

module.exports.getRideById = async (req,res) =>{
    const {rideId} = req.body

    const ride = await rideModel.findById({_id:rideId,
        status :{$in:['pending']} 
    }).populate('user');

    if(!ride){
        return res.status(404).json({message:'Ride not found'});
    }

    return res.status(200).json(ride);
} 
 
 
 module.exports.getActiveRide = async (req, res) => {
  const ride = await rideModel.findOne({
    user: req.user._id,
    status: { $in: ["pending", "accepted", "started"] }
  }).populate("captain").populate('user');

  if (!ride) {
    return res.status(200).json({ active: false });
  }

  res.status(200).json({
    active: true,
    ride
  });
};  






