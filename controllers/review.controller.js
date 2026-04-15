const captainModel = require("../models/captain.model");


module.exports.addReview = async (req , res) =>{

    const {captainId , rating , comment} = req.body;

    try{
        const captain = await captainModel.findById(captainId);

       if(!captain){
           return res.status(404).json({message:'captain not found'});
        
        }
        // const userId = req.user._id;

        const totalRating = captain.rating * captain.numReviews;
        const newNumReviews = captain.numReviews + 1;
        const newRating = (totalRating + rating) / newNumReviews;

        captain.rating = newRating;
        captain.numReviews = newNumReviews;
         

        captain.reviews.push({
           
            rating,
            comment
        });
// console.log(captain.reviews)

        await captain.save();


        res.status(200).json({
            succsess : true,
            message : ' Review added '
        })
    }catch(err){
         res.status(500).json({message: err.message})
    }
}