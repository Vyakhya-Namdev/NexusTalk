import { Server } from "socket.io";

let connections = {}
let messages = {}
let timeOnline = {}

export const connectToSocket = (server) => {
    console.log("SOMETHING CONNECTED");    //will display if user will connect to socket-server
    const io = new Server(server, {
        //pass cors to protect it from cors errors (cors-origin-allowed)
        //pass it only while testing and not in production
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['*'],
            credentials: true
        }
    });

    //socket connection
    io.on('connection', (socket) => {
        console.log('A user has connected!');
        socket.on("join-call", (path) => {
            if(connections[path] == undefined){
                connections[path] = [];
            }
            connections[path].push(socket.id);   //find the socket id and make connection
            timeOnline[socket.id] = new Date();
            //connect with all connections exists in the path
            for(let a=0; a<connections[path].length; a++){
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path]);
            }
            //send message to every user connected in the network
            if(messages[path] !== undefined){
                for(let a=0; a<messages[path].length; a++){
                    io.to(socket.id).emit(messages[path][a]['data'], messages[path][a]['sender'], messages[path][a]['socket-id-sender']);
                }
            }

        });

        socket.on('signal', (toId, message) => {
            io.to(toId).emit('signal', socket.id, message);
        });

        socket.on('chat message', (msg, sender) => {   //server recieving msg
            // console.log('User message:' + msg);
            // io.emit('chat message', msg);       // Broadcast message to all clients

            // identifying the room of a connected user (socket.id) from all active rooms.
            //It loops through all rooms and checks if the socket is present in the list of users for that room. Once it finds the matching room, it stops searching and returns the room name along with a flag indicating it was found.
            const[matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {
                    if(!isFound && roomValue.includes(socket.id)){
                        return [roomKey, true];
                    }
                    return [room, isFound];
                }, ['', false]);

                //if room found then send message
                if(found == true){
                    if(messages[matchingRoom] == undefined){
                        messages[matchingRoom] = [];
                    }
                    messages[matchingRoom].push({"data":data, "sender":sender, "sender-id-socket": socket.id});

                    console.log("message", key, ":", sender, data);

                    connections[matchingRoom].forEach(elem => {
                        io.to(elem).emit("chat-message", data, sender, socket.id);
                    })
                }
        });

        socket.on('disconnect', () => {
            // console.log('User disconnected');
            var timeDiff = Math.abs(timeOnline[socket.id] - new Date());
            var key
            //key(k) -> matchingroom, value(v) -> what is it's value
            for(const [k,v] of JSON.parse(JSON.stringify(Object.entries(connections)))){
                for(let a=0; a<v.length; ++a){
                    if(v[a] == socket.id){
                        key = k
                        for(let a=0; a<connections[key].length; ++a){
                            io.to(connections[key][a]).emit('user-left', socket.id);
                        }

                        //remove idx of that connection also
                        var idx = connections[key].indexOf(socket.id);
                        connections[key].splice(idx, 1);

                        //if connections are totally empty now, delete that connection array
                        if(connections[key].length == 0){
                            delete connections[key];
                        }
                    }
                }
            }
        });
    })
    return io;
}