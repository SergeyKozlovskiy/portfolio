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
                let result = await response.json();
                showPopup(result.message);
                form.reset();
            }      
        }
    
    const showPopup = (message) => {
        //показать
        const popup = document.querySelector('.popup__error');
        popup.parentNode.style.transform = 'scale(1)';
        popup.textContent= message;
        popup.classList.add('activePopup');
        //спрятать
        setTimeout(() => {
        popup.classList.remove('activePopup');
        }, 2000);
        setTimeout(() => {
        popup.parentNode.style.transform = 'scale(0)';
        popup.textContent = '';
        }, 2300);
    } ;       
    const formValidate = (form) => {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for(let index = 0; index < formReq.length; index ++){
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    showPopup('Не корректный E-mail');
                    formAddError(input);
                    error++;
                }
            }else if(input.value === '') {
                showPopup('Заполните все поля');
                formAddError(input);
                error++;
            } else if(input.classList.contains('_tel')){
                if(telTest(input)){
                showPopup('Не корректный номер');    
                formAddError(input);
                error++;
                }
            } 
        
        }
        return error;
        
    };
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
    };
});