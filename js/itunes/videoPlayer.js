export const videoPlayerInit = () => {
    const videoPlayer =  document.querySelector( ".video-player");
    const buttonPlay =  document.querySelector( ".video-button__play");
    const buttonStop =  document.querySelector( ".video-button__stop");
    const timePassed =  document.querySelector( ".video-time__passed");
    const videoProgress =  document.querySelector( ".video-progress");
    const timeTotal =  document.querySelector( ".video-time__total");

    const toggleIcon = () => {
        if(videoPlayer.paused){
            buttonPlay.classList.remove('fa-pause');
            buttonPlay.classList.add('fa-play');
        }else{
            buttonPlay.classList.add('fa-pause');
            buttonPlay.classList.remove('fa-play');
        }
    };

    const togglePlay = () => {
        if(videoPlayer.paused){
            videoPlayer.play();
        }else{
            videoPlayer.pause();
        }
        toggleIcon();
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        toggleIcon();
    };

    const addZero = n => n < 10 ? '0' + n : n;

    videoPlayer.addEventListener('click', togglePlay);
    buttonPlay.addEventListener('click', togglePlay);
    videoPlayer.addEventListener('play', toggleIcon);
    buttonPlay.addEventListener('pause', toggleIcon);
    buttonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime/duration) * 100;

        let minPass = Math.floor(currentTime / 60);
        let secPass = Math.floor(currentTime % 60);

        let minTotal = Math.floor(duration / 60);
        let secTotal = Math.floor(duration % 60);

        timePassed.textContent = `${addZero(minPass)}:${addZero(secPass)}`;
        timeTotal.textContent = `${addZero(secTotal)}:${addZero(minTotal)}`;
    });

    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;
        videoPlayer.currentTime = (value * duration) / 100;
    });
};