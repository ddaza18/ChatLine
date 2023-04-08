$(function(){
    const socket = io();
    var user = '';
    //acceso a los elementos del DOM

    const messageForm = $('#message-form');
    const message = $('#message');
    const chat = $('#chat');
    const formUser = $('#usuario_form');
    const formError = $('#user_nuevo_error');
    const nombreUsuario = $('#usuario_nombre');
    const conectados = $('#usernames');

    //Eventos

    //Enviamos un msg al sv
    messageForm.submit(ev => {
        ev.preventDefault();
        socket.emit('enviar mensaje', message.val());
        message.val('');
    });

    //respuesta del SV
    socket.on('nuevo mensaje', function(datos){
        let color = '#f4f4f4';
        if(user == datos.username){
            color = '#9ff4c5';
        }
        if(datos.msg == ''){ //valida que los datos no lleguen nulos
            window.alert("El mensaje no puede estar vacio.");
            return;
        }else{
            chat.append(`<div class="msg-area mb-2" style="background-color:${color}"><b>${datos.username}</b><p class="msg">${datos.msg}</div>`);
        }
    });

    //nuevo usuario en chat
    formUser.submit(ev =>{
        ev.preventDefault();
        console.log("Enviando...");
        if (nombreUsuario.val().trim() === '') { //valida que el campo del username no este vacio al momento de ingresar al chatLine
            window.alert("El campo 'nombre de usuario' no puede estar vacio.");
            return;
        }else{
        socket.emit('nuevo usuario chat', nombreUsuario.val(), datos =>{        
            if(datos != null && datos){
                user = nombreUsuario.val();
                $('#user_nuevo').hide();
                $('#content-wrap').show();
            }else{
                formError.html(`<div class="alert alert-danger">El usuario ya existe en el chat</div>`);
            } 
           
            nombreUsuario.val('');
        });
    }
    });

    //obtener los usuarios conectados

    socket.on('usernames', datos =>{
        let html = '';
        let color = '';
        let salir = '';

        for(let i = 0; i < datos.length; i++){
            if(user == datos[i]){
                color = '#027f43';
                salir = `<a class="enlace-salir" style="text-decoration: none;" href="/"><i class="fas fa-sign-out-alt">Salir</i></a>`;
            }else{
                color = '#000';
                salir = '';
            }
            html += `<p style="color:${color}"><i class="fas fa-user"></i> ${datos[i]} ${salir}</p>`;
        }

        conectados.html(html);
    });
});
