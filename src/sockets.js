module.exports = (io) =>{

    let nombresUsuarios = [];

    io.on('connection', socket =>{
        console.log("Nuevo usuario conectado");

        //recoje los datos del msg enviado
        socket.on('enviar mensaje', (datos) =>{
           io.sockets.emit('nuevo mensaje', {
                msg:datos,  
                username:socket.nickname
           });
           console.log("Mensaje enviado al SV")
        });

        socket.on('nuevo usuario chat', (datos, callback) =>{
            if(nombresUsuarios.indexOf(datos) != -1){ //valida si el usuario ya esta en el chat
                callback(false);
            }else{
                callback(true);
                socket.nickname = datos;
                nombresUsuarios.push(socket.nickname);
                actualizarUsuarios();
            }
        });

        //valida la desconeccion del usuario presente en el Chat    
        socket.on('disconnect', datos =>{
            if(!socket.nickname){
                return;
            }else{
                nombresUsuarios.splice(nombresUsuarios.indexOf(socket.nickname), 1); //busca su poscicion en el array y lo elimina con splice()
                console.log("Un usuario se a desconectado");
                actualizarUsuarios();
            }
        });
    });


    //actualizar usuarios
    function actualizarUsuarios() {
        io.sockets.emit('usernames', nombresUsuarios); //pasamos lo que esta '' al main
    }
}