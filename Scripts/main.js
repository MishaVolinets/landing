$(document).ready(function(){
    $('#apply').on('click', function(){
        var emailModel = {};
        emailModel.firstName = $('#firstName').val();
        emailModel.lastName = $('#lastName').val();
        emailModel.email = $('#email').val();
        emailModel.projectType = $('#projectType').val();
        var jsonModel = JSON.stringify(emailModel);
        debugger;

        $.ajax({
            url: 'http://localhost:8000/send',
            method: 'POST',
            data: jsonModel,
            contentType: "application/json",
            success: function(data){
                debugger;
            }
        });
    });
});