const captainModel = require('../models/captain.model');

module.exports.createCaptain = async({
    firstname, lastname, email, password,
    color, plate, capacity , vehicleType
})=>{
    if(!firstname || !email || !password || !color || !capacity || !vehicleType || !plate){
        throw new Error('All fields are required');
    }
    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain;
};

module.exports.updateCaptainProfile = async (captainId, updates, profileImagePath) => {
    const captain = await captainModel.findById(captainId);
    if (!captain) throw new Error('Captain not found');
    if (updates.fullname) {
        if (updates.fullname.firstname) captain.fullname.firstname = updates.fullname.firstname;
        if (updates.fullname.lastname) captain.fullname.lastname = updates.fullname.lastname;
    }
    if (updates.vehicle) {
        if (updates.vehicle.color) captain.vehicle.color = updates.vehicle.color;
        if (updates.vehicle.plate) captain.vehicle.plate = updates.vehicle.plate;
        if (updates.vehicle.capacity != null) captain.vehicle.capacity = updates.vehicle.capacity;
        if (updates.vehicle.vehicleType) captain.vehicle.vehicleType = updates.vehicle.vehicleType;
    }
    if (profileImagePath) captain.profileImage = profileImagePath;
    await captain.save();
    return captain;
};