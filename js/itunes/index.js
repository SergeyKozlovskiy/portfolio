import { videoPlayerInit } from './videoPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
import { radioPlayerInit } from './radioPlayer.js';

document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    const playerBtn = document.querySelectorAll('.player-btn');
    const playerBlock = document.querySelectorAll('.player-block');
    const temp = document.querySelector('.temp');
    // remove active
    const  deactivated = (b) => {
      temp.style.display = "none";
    playerBtn.forEach((el) => {
        el.classList.remove('active');
    });
    playerBlock.forEach((el) => {
        el.classList.remove('active');
    });
  };
    // add active
    playerBtn.forEach((el, i) => {
        el.addEventListener('click', () => {
            deactivated(i);
            el.classList.add('active');
            playerBlock[i].classList.add('active');
        });
    });


    videoPlayerInit();
    radioPlayerInit();
});