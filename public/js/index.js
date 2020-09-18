function checkEncryption(event){
    if(document.getElementById('enc').value == ''){
        alert('please generate a encryption key');
        event.preventDefault();
    }
    else{
        let cipher = CryptoJS.AES.encrypt(document.getElementById('plaintext').value,"secret").toString();
        document.getElementById('enctext').innerHTML  = cipher; 
        socket.emit('cipher',cipher);

    }
}
var socket = io();
socket.on('y_value_emit',function(msg){
    console.log('socket y'+ msg);
    alert('value received from Server with id ' + socket.id + "\n is " + msg);
    document.getElementById('B').innerHTML = msg;
    let key = Math.pow(parseInt(msg),document.getElementById('rnd').innerHTML)%parseInt(document.getElementById('p').value);
    alert('key for encryption is '+ key);
    document.getElementById('enc').innerHTML = key;

socket.on('plainText', (msg) => {
    alert("the Server has provided an encrypted text" + msg);
    alert("this can only be decrypted if the user has the symmetric decryption key");
    var replyText = CryptoJS.AES.decrypt(msg,"secret").toString(CryptoJS.enc.Utf8);
    console.log(replyText);
    alert("The decrypted message of the server is "+ replyText);
    document.getElementById('enctext2').innerHTML = msg;
    document.getElementById('enctext3').innerHTML = replyText;
})


});
socket.on('redirection', (msg) =>{
	window.location.href = "https://www.coolmathgames.com";
	console.log("Good game well played");

});

//socket.on('disconnect',(msg) =>{
//    window.location.href = "https://www.coolmathgames.com/"
//    console.log('disconnected')
//});
function handlePublicX(number){
    console.log(Math.pow(document.getElementById('g').value,parseInt(number)));
    var X = Math.pow(parseInt(document.getElementById('g').value),parseInt(number)) % parseInt(document.getElementById('p').value);
    console.log(X);
    alert("generated X value is " + X);
    var data = { 
        p : document.getElementById('p').value,
        g : document.getElementById('g').value,
        X : X 
    }
    
    socket.emit('x_value_emit', data);
    document.getElementById('A').innerHTML = data.X
}
function handleRandom(e){
    //e.preventDefault();
    var number = Math.floor(Math.random()* parseInt(document.getElementById('g').value));
    //number = 4;
    console.log(number);
    document.getElementById('rnd').innerHTML = number;
    handlePublicX(number);

}
