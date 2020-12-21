$("#sendMail").on("click", function() {
    let name = $("#name").val().trim();
    let phone = $("#phone").val().trim();
    let email = $("#email").val().trim();
    let text = $("#text").val().trim();
    console.log(name);

    if(email == "" || phone == "" || name == "" || text == ""){
      $("#errorMess").text("Заполните все поля"); 
      return false; 
    }
    $("#errorMess").text("");

    $.ajax({
        url:'ajax/mail.php',
        type: 'POST',
        cashe: false,
        data: {'name': name,
                'email':email,
                'phone':phone,
                'text':text},
        dataType: 'html',
        beforeSend: function(){
            $("#sendMail").prop("disabled", true);
        },
        success: function(data) {
            if(!data)
                alert('не отправлено');
            else
                $('#form').trigger('reset');
                $("#sendMail").prop("disabled", false);
        }        
    })
});