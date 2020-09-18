const express = require('express');
const bodyParser = require('body-parser');
const AES  = require('crypto-js/aes');
const socket = require('socket.io');
const Bcrypt = require('crypto-js');
const app = express();

const PORT = process.env.PORT || 3000 ;
const secret = require('./secret.js');
secret.b = Math.floor(Math.random() * secret.g);
console.log(secret);


var http = require('http').createServer(app);
var io = socket(http);

app.use(express.static("public"));


app.get('/', (req, res) => {
  res.sendFile(__dirname+ '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('x_value_emit',(msg) =>{
        console.log(msg);
        secret.p  =  msg.p;
        secret.g = msg.g
        io.emit('y_value_emit',generateYvalue(msg.X));
    });

    socket.on('cipher', (msg) =>{
        console.log(msg);
        d_msg = AES.decrypt(msg,"secret").toString(Bcrypt.enc.Utf8);
        if(d_msg != "beautiful bird"){
          //io.emit('disconnect');
	  io.emit('redirection',d_msg);
        }
        else {
          console.log('the plain text is ' + AES.decrypt(msg,"secret").toString(Bcrypt.enc.Utf8));
        io.emit('plainText',AES.encrypt("We will commence the attack tomorrow on Mumbai","secret").toString())
        }
        
    });
  });


http.listen(PORT, () => {
  console.log('the application is listening on *:' + PORT);
});


function generateYvalue(msg){
    var y;
    
    y = Math.pow(parseInt(secret.g),secret.b) % secret.p; 
    secret.X = msg;
    secret.encryption = Math.pow(parseInt(secret.X),parseInt(y)) % secret.p;
    console.log(secret.encryption);
    return y;
}
