const captainModel = require('../models/captain.model');

module.exports.createCaptain = async({
    firstname, lastname, email, password,
    color, plate, capacity , vehicleType, mobileno
})=>{
    console.log('firstname',firstname);
    console.log('mobileno',mobileno)
    if(!firstname || !email || !password || !color || !capacity || !vehicleType || !plate || !mobileno){
        throw new Error('All fields are required');
    }
    
    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        mobileno,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain;
};

 