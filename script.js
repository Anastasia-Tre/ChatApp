
const messageFrom = data => {
    return `
    <div class="row valign-wrapper" style="margin: 0; width: 100%;">
        <div class="col">
            <div class="purple circle valign-wrapper center-align" style="width: 50px; height: 50px;">
                <div class="container"><span>${data.name}</span></div>
            </div>
        </div>
        <div class="col s11">
            <div class="card-panel pink lighten-3 left" style="width: fit-content; padding: 10px;">
                <span class="black-text">${data.message}</span>
            </div>
        </div>
    </div>`
};

const messageTo = data => {
    return `
    <div class="row valign-wrapper right" style="margin: 0; width: 100%;">
        <div class="col s11">
            <div class="card-panel pink lighten-4 right" style="width: fit-content; padding: 10px;">
                <span class="black-text">${data.message}</span>
            </div>
        </div>    
    </div>`
};


const socket = io('http://localhost:3000');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What is your name?');
appendMessageTo({message: 'You joined'});
socket.emit('new-user', name);

socket.on('chat-message', data => {
    appendMessageFrom(data);
});

socket.on('user-connected', _name => {
    appendMessageFrom({ name: _name, message: `${_name} joined` });
});

socket.on('user-disconnected', _name => {
    appendMessageFrom({ name: _name, message: `${_name} disconnected`} );
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessageTo({message: message});
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

function appendMessageFrom(data) {
    const container = document.getElementById('message-container');
    container.innerHTML += messageFrom(data);
}

function appendMessageTo(message) {
    const container = document.getElementById('message-container');
    container.innerHTML += messageTo(message);
}




