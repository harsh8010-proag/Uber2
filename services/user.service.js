const userModel = require('../models/user.model');

module.exports.createUser = async({firstname, lastname, email, password,mobileno}) =>{
if(!firstname|| !email || !password || !mobileno){
    throw new Error('All fields are required');
}
const  user = userModel.create({
    fullname:{
        firstname,
        lastname
    },
   email,
   password,
   mobileno
});

return user;
}