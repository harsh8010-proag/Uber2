const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server){
    io = socketIo(server ,{
        cors:{
            origin: '*',
            methods: [ 'GET' , 'POST']
        }
    });

    io.on('connection', (socket)=>{
     
        console.log(`Client connected : ${socket.id}`);

        socket.on('join',async(data)=>{
            const {userId, userType } =data;
          

            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id});
                  console.log(`${userType} is connected as ${socket.id}`);
            } else if (userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId ,{ socketId: socket.id });
                  console.log(` ${socket.id} id is connected as ${userType}`);
            }
        });

        socket.on('update-location-captain', async(data)=>{
            const {userId, location } = data;
            // console.log(` ltd:${location.ltd} lng:${location.lng}`);

            if(!location || !location.ltd || !location.lng){
                return socket.emit('error',{ message: 'Invalid location data'});
            }

await captainModel.findByIdAndUpdate(userId, 
      {
    $set: {
      "vehicle.location": {
        type: "Point",
        coordinates: [
          Number(location.lng),
          Number(location.ltd)
        ]
      }
    }
  },
  { new: true }

 );

//  const cap = await captainModel.findById(userId);
// console.log(cap.vehicle.location);

 });
       
       socket.on('disconnect',()=> {
        console.log(`Client disconnected : ${socket.id}`);
       });
    });
}

const sendMessageToSocketId = (socketId, messageObject)=>{

  

    if(io){
 
        io.to(socketId).emit(messageObject.event, messageObject.data);

    }else{
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };
