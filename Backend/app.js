const dotenv         = require('dotenv');
                        dotenv.config();
const express        = require('express');
const path           = require('path');
const fs = require('fs')
const cors           = require('cors');
const app            = express();
const cookieParser   = require('cookie-parser');
const connectToDb    = require('./db/db');
const userRoutes     = require('./routes/user.routes');
const captainRoutes  = require('./routes/captain.routes');
const mapRoutes      = require('./routes/maps.routes');
const rideRoutes     = require('./routes/ride.routes');
 const ridehistory   = require('./routes/ridehistory.routes');
const contact        = require('./routes/contact.routes');
 

const userDir = path.join(__dirname, "uploads/user");
const captainDir = path.join(__dirname, "uploads/captain");

if (!fs.existsSync(userDir)) {
  fs.mkdirSync(userDir, { recursive: true });
}

if (!fs.existsSync(captainDir)) {
  fs.mkdirSync(captainDir, { recursive: true });
}


connectToDb();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
    origin:['http://localhost:5173','https://aber-ride-booking-system.vercel.app'],
    credentials:true
}));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 

// app.get('/' ,(req,res)=>{
//     res.send('Hello World');
// });

app.use('/users',userRoutes);

app.use('/captains',captainRoutes);
app.use('/maps',mapRoutes);
app.use('/rides',rideRoutes);
app.use('/history',ridehistory);
app.use('/help',contact)


module.exports =app;  
