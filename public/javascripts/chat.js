$(document).ready(function()
{
    loadMessages();

    //Cada 5 segundos recarga los mensajes del chat.
    setInterval(function() { 
        loadMessages();
    }, 5000);
});

//Función que carga los mensajes y baja el scrollbar para ver el último.
function loadMessages()
{
    $("#data").load("/messages"); 
    $(".chatRow").animate({ scrollTop: $(document).height() }, "fast");
}

//Al pulsar enter en el textarea del chat envía el mensaje.
$(function() {
    $("#chatbox").keypress(function (e) {
        if(e.which == 13) {
            e.preventDefault();
            $("#chatboxForm").submit();
        }
    });
});