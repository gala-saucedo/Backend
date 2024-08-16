const socket = io()

socket.emit("message", "Hola, soy un cliente")

socket.on("evento_para_un_socket_individual", data => {
    console.log(data)
})