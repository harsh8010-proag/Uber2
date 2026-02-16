const dotenv         = require('dotenv');
                        dotenv.config();
const express        = require('express');
const path           = require('path');
const cors           = require('cors');
const app            = express();
const cookieParser   = require('cookie-parser');
const connectToDb    = require('./db/db');
const userRoutes     = require('./routes/user.routes');
const captainRoutes  = require('./routes/captain.routes');
const mapRoutes      = require('./routes/maps.routes');
const rideRoutes     = require('./routes/ride.routes');
 

connectToDb();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 

app.get('/' ,(req,res)=>{
    res.send('Hello World');
});

 
 
app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps',mapRoutes);
app.use('/rides',rideRoutes);

module.exports =app;  
