const mongoose = require('mongoose');

const rideScema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'captain',
        },
    pickup:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required: true,
    },
    fare:{
        type:Number,
        required:true
    },

    status:{
        type: String,
        enum : ['pending','accepted','ongoing','completed','cancelled'],
        default: 'pending',
    },
    paymentMethod:{
         type: String,
         enum: ['cash','upi'],
         default:'cash'
    },
    paymentStatus:{
         type: String,
         enum: ['pending','paid'],
         default:'pending'
            },
    duration:{
        type:Number,
    },// in decond
    distance:{
        type:Number,
    },
    PaymentID:{
           type:String,
    },
    signature: {
        type:String
    },

    otp: {
        type:String,
        select: false,
        required:true
    }
},{ timestamps: true })

module.exports = mongoose.model('ride',rideScema);