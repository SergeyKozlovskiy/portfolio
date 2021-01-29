export const radioPlayerInit = () => {
    const radio  = document.querySelector('.radio'),
        radioCoverImg = document.querySelector('.radio-cover__img'),
        radioNavigation = document.querySelector('.radio-navigation'),
        radioItem = document.querySelectorAll('.radio-item');
    let radioHeader = document.querySelector('.radio-header__big'),
        radioStop = document.querySelector('.radio-stop');

        const audio = new Audio();
        audio.type = 'aac';

        radioStop.disabled = true;

        const changeIconPlay = () => {
            if(audio.paused){
                radio.classList.remove('play');
                radioStop.classList.remove('fa-stop');
                radioStop.classList.add('fa-play');
            }else{
                radio.classList.add('play');
                radioStop.classList.add('fa-stop');
                radioStop.classList.remove('fa-play');
            }
        };

        const selctItem = el => {
            radioItem.forEach(el => el.classList.remove('select'));
            el.classList.add('select');
        };
        radioNavigation.addEventListener('change', (event) => {
            let target = event.target;
            let parent = target.closest('.radio-item');
            selctItem(parent);

            const title = parent.querySelector('.radio-name').textContent;
            radioHeader.textContent = title;

            const img = parent.querySelector('.radio-img').src;
            radioCoverImg.src = img;
            
            radioStop.disabled = false;
            audio.src = target.dataset.radioStantion;
            audio.play(); 
            changeIconPlay();
        });

        radioStop.addEventListener('click', () => {
            if(audio.paused){
                audio.play();
            }else{
                audio.pause();
            }
            changeIconPlay();
        });
};