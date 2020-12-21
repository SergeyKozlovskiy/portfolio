<<<<<<< HEAD
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
=======
" use strict";
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
        let formData = new FormData(form);

        if(error === 0){
            form.classList.add('_sending');
             let response = await fetch('mail.php', {
                 method: 'POST',
                 body: formData
             });
            if(response.ok){
                 let result = await response.json();
                 alert(result.message);
                 form.reset();
                 form.classList.remove('_sending');
            }else{
                alert('ошибка');
                form.classList.remove('_sending');
            }
            }else{
               const popup = document.querySelector('.popup__error');
               popup.parentNode.style.transform = 'scale(1)';
               popup.classList.add('activePopup');
               setTimeout(() => {
                popup.classList.remove('activePopup');
               }, 2000)
               setTimeout(() => {
                popup.parentNode.style.transform = 'scale(0)';
                popup.textContent = '';
               }, 2300)
               }
              
            }
    

    const formValidate = (form) => {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for(let index = 0; index < formReq.length; index ++){
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }else if(input.value === '') {
                let popup = document.querySelector('.popup__error');
                popup.textContent='Заполните все поля';
                formAddError(input);
                error++;
            } else if(input.classList.contains('_tel')){
                if(telTest(input)){
                popup.textContent='Только цифры';
                formAddError(input);
                error++;
                }
            }
        
        }
        return error;
    }
    const formAddError = (input) => {
        input.classList.add('_error');
    };
    const formRemoveError = (input) => {
        input.classList.remove('_error');
    };
    const emailTest = (input) => {
        return !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(input.value);
    };
    const telTest = (input) => {
        return !/^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/.test(input.value);
    }
>>>>>>> 60b57e79618fa8377fe70d65fac5052c010ca05f
});