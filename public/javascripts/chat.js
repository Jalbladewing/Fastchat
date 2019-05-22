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
    $("#data").load("/channel/"+ $("#channelId").val() +"/messages"); 
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

//Pasar id a la ventana emergente
$(document).on("click", ".open-DeleteChannelModal", function () {
    var channelId = $(this).data('id');
    $(".modal-body #channelId").val( channelId );
});

function editChannel(evt, channelId)
{
    evt.preventDefault();
    var formSerialized =  $("#chatboxForm").serialize();

    $.ajax({
        url: '/modifyChannel/' + channelId,
        data: formSerialized,
        method: 'PUT',
        success: function(result) {
            window.location.href="/editChannel/" + channelId; 
        }
    });
}

function deleteChannel()
{
    $.ajax({
        url: '/channel/' + $(".modal-body #channelId").val(),
        method: 'DELETE',
        success: function(result) {
            window.location.href="/"; 
        }
    });
}