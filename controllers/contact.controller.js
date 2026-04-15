const contactModel = require('../models/contact.model');


module.exports.contact =async (req,res) => {

         const{name,email,description}=req.body

         if(!name || !email || !description ){
          res.status(400).json({message:'all fields are required'});
           }

           const contact = await contactModel.create({
            name,email,description
           });

           res.status(201).json({contact})
            
}