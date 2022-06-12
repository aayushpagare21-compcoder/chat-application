//Client connected to Server
const socket = io('http://localhost:3000'); 
 
//Asks name from newly joined user
const name = prompt("Enter your name ! ");   

//constants
const messageArea = document.querySelector('.message-area'); 
const sendBtn = document.getElementById('send'); 
const textArea = document.getElementById('textarea');   
let audio = new Audio('../static/Notification.mp3'); 

//Appending messages to DOM
const append = (name, message, position) => {   
   
    if (position == 'incoming') { 
        audio.play();
    }
    const messageElement = document.createElement('div'); 
    messageElement.classList.add('message');
    messageElement.classList.add(position);   
    messageElement.innerHTML = `<h5>${name}</h5> <p>${message}</p>`;
    messageArea.append(messageElement);
} 

//When user clicks send button
sendBtn.addEventListener('click', () => {  
    const msg = textArea.value;   
    append('You', msg, 'outgoing'); 
    socket.emit('send', msg);  //client emits an send event which is handeled by server
    textArea.value = "";
});

//client emits that he joined to server
socket.emit('new-user-joined', name); 

//listening to event emmited by server
socket.on('user-joined', data => {  
    alert(`${data} joined`);
    append(data, `${data} joined the group chat`, 'incoming');
}); 

//listening to recieve event emitted by client
socket.on('recieve', data => { 
    append(data.name, data.message, 'incoming');
})
