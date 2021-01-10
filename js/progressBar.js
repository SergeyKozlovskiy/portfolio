' use strict ';
const skill = document.querySelector('.skill');
const empty = document.querySelectorAll('.empty');

class ProgressBar{
    constructor(option){
        const {
            start = 0,
            end = 100,
            bg = 'green',
            
            fontSize = 12,
            textColor = 'white',
            border = '0px solid black',
            padding = '1px 10px'
        } = option;

        this.start = start;
        this.end = end;
        this.bg = bg;
        this.textColor = textColor;
        this.border = border;
        this.padding = padding;
        this.fontSize = fontSize;
    }

    init(selector){
        document.querySelector(selector).append(this.createProgressBar());
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        const bar = this.createBar();
        progressBar.append(bar);
        progressBar.style.width = '100%';
        progressBar.style.border= this.border;
        this.animateBar(bar);
        return progressBar;
    }

    createBar() {
        const bar = document.createElement('div');
        bar.style.cssText = `
            text-align: center;
            background-color: ${this.bg};
            font-size: ${this.fontSize}px;
            line-height: ${this.height}px;
            color: ${this.textColor};
            padding: ${this.padding};
        `;
        this.stateProgress(bar);
        return bar;
    }

    stateProgress(elem) {
        elem.style.width = `${this.start}%`;
        elem.textContent = `${this.start}%`;
    }

    animateBar(bar) {
        const animate = () => {
           
            if(this.start < this.end) {
                this.start++;
                this.stateProgress(bar);
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }
}

class RoundedProgressBar extends ProgressBar {
    constructor(option = {}){
        super(option);
        const {rounded} = option;
        this.rounded = rounded;
    }

    createProgressBar() {
        const progressBar = super.createProgressBar();
        this.roundedBar(progressBar);
        return progressBar;
    }
    roundedBar(elem){
        elem.style.borderRadius = this.rounded;
        elem.firstChild.style.borderRadius = this.rounded;
    }
}

const newBar = new RoundedProgressBar({
    rounded: '50px',
    end: 90,
    bg: '#333333',
    padding : '1px 10px'
});
const newBar2 = new RoundedProgressBar({
    rounded: '50px',
    end: 80,
    bg: '#333333',
    padding : '1px 10px'
});
const newBar3 = new RoundedProgressBar({
    rounded: '50px',
    end: 65,
    bg: '#333333',
    padding : '1px 10px'
});
const newBar4 = new RoundedProgressBar({
    rounded: '50px',
    end: 80,
    bg: '#333333',
    padding : '1px 10px'
});
const newBar5 = new RoundedProgressBar({
    rounded: '50px',
    end: 70,
    bg: '#333333',
    padding : '1px 10px'
});
const newBar6 = new RoundedProgressBar({
    rounded: '50px',
    end: 70,
    bg: '#333333',
    padding : '1px 10px'
});
const newBar7 = new RoundedProgressBar({
    rounded: '50px',
    end: 80,
    bg: '#333333',
    padding : '1px 10px'
});
const newBar8 = new RoundedProgressBar({
    rounded: '50px',
    end: 60,
    bg: '#333333',
    padding : '1px 10px'
});


window.addEventListener('scroll', function() {
    let targetPosition = {
        top: window.pageYOffset + skill.getBoundingClientRect().top,
        left: window.pageXOffset + skill.getBoundingClientRect().left,
        right: window.pageXOffset + skill.getBoundingClientRect().right,
        bottom: window.pageYOffset + skill.getBoundingClientRect().bottom
        },
    windowPosition = {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        }; 
    if (targetPosition.bottom > windowPosition.top && 
        targetPosition.top < windowPosition.bottom && 
        targetPosition.right > windowPosition.left && 
        targetPosition.left < windowPosition.right) {

            empty.forEach(el => {
                if(el.hasChildNodes()){
                    return;
                }else{
                    newBar.init('.progress-bar_1');
                    newBar2.init('.progress-bar_2');
                    newBar3.init('.progress-bar_3');
                    newBar4.init('.progress-bar_4');
                    newBar5.init('.progress-bar_5');
                    newBar6.init('.progress-bar_6');
                    newBar7.init('.progress-bar_7');
                    newBar8.init('.progress-bar_8');
                }
            });
        }    

});