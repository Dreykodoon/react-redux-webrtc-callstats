import io from 'socket.io-client';
import store from "./store";
import { addUser } from "./js/actions/userActions";


const socket = io('http://localhost:8080');
socket.emit('message', 'connection succeeded');

socket.on('created', function(room) {
    console.log('Message from server: Created room: ', room);
});

socket.on('full', function(room) {
    console.log('Message from server: Room ' + room + ' is full :^(');
});

socket.on('joined', function(room) {
    console.log('Message from server: Joined room: ', room);
});

store.dispatch(addUser('works'));

export default socket;
