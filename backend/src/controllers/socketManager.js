import { Server } from "socket.io";

export const connectToSocket = (server) => {
    const io = new Server(server, {
        connectionStateRecovery: {}
    });
    io.on('connection', (socket) => {
        console.log('A user has connected!');
        socket.on('chat message', (msg) => {   //server recieving msg
            console.log('User message:' + msg);
            io.emit('chat message', msg);       // Broadcast message to all clients
        });
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    })
    return io;
}