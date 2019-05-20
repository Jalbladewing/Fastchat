$(function() {
    $("#chatbox").keypress(function (e) {
        if(e.which == 13) {
            e.preventDefault();
            $("#chatboxForm").submit(); 
        }
    });
});