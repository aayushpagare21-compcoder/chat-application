//Server will listen at port number 3000
 const io = require('socket.io')(3000, { 
    cors : { 
        origin : '*'
    }
}); 

const users = {}; 

//socket.io instance 
//whenever a new browser connects it handles the connection 
//connection is an custom event emitted by client and handled by server  
//e.g 1.) Aayush joined he'll get a unique socket.id
io.on('connection', socket => {   

    // a new browser which connects gets a socket.id and a socket  
    //new-user-join is a custom event emitted by client and handeled by server 
    //2.) Aayush emitted an event new-user-joined and passed his name as well
    socket.on('new-user-joined', name => { 
        
        //every browser has a unique soket.id
        users[socket.id] = name;  

        //server brodacasts user-emit custom event to every client  
        //3.) Server broadacasts to every client that Aayush joined
        socket.broadcast.emit('user-joined', name);
    });   

    //Client emitts a send custom event which is handled by the server 
    //4.) If Aayush sends message then he emitts the send event and message as well 
    socket.on('send', message => { 
        
        //Server Brodacasts recive event to every client connected 
        // 5.) Server sends message to every client that aayush has emitted
        socket.broadcast.emit('recieve', {message : message, name : users[socket.id]});
    }); 
});