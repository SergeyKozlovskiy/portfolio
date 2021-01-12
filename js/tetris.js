'use strict';
const audio  = document.querySelector('.audio');

const modalEnd = document.querySelector('.modal-end');
const gameover = document.querySelector('.modal-end-score');

const yes = document.querySelector('.yes');
const no = document.querySelector('.no');
 const GameOver = document.querySelector('.gameOver');

const height = document.documentElement.clientHeight;
const gameArea = document.querySelector('.gameArea');
gameArea.style.height = `${height}px`;



window.addEventListener('keydown', (e) => {
if(e.keyCode == 37 || e.keyCode == 39){
    event.preventDefault();
}
});


const overlay = document.querySelector('.overlay'),
    modal = document.querySelector('.modal'),
    main = document.querySelector('.main'),
    
    // массив элементов
    mainArr = [
        // Палка
        [
            [0, 1],
            [0, 2],
            [0, 3],
            // Поворот на 90 градусов
            [
                [-1, 1],
                [0, 0],
                [1, -1],
                [2, -2],
            ],
            // Поворот на 180 градусов
            [
                [1, -1],
                [0, 0],
                [-1, 1],
                [-2, 2],
            ],
            // Поворот на 270 градусов
            [
                [-1, 1],
                [0, 0],
                [1, -1],
                [2, -2],
            ],
            // Поворот на 360 градусов
            [
                [1, -1],
                [0, 0],
                [-1, 1],
                [-2, 2],
            ]
        ],
        // Квадрат
        [
            [1, 0],
            [0, 1],
            [1, 1],
            // Поворот на 90 градусов
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            // Поворот на 180 градусов
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            // Поворот на 270 градусов
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            // Поворот на 360 градусов
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ]
        ],
        // L
        [
            [1, 0],
            [0, 1],
            [0, 2],
            // Поворот на 90 градусов
            [
                [0, 0],
                [-1, 1],
                [1, 0],
                [2, -1],
            ],
            // Поворот на 180 градусов
            [
                [1, -1],
                [1, -1],
                [-1, 0],
                [-1, 0],
            ],
            // Поворот на 270 градусов
            [
                [-1, 0],
                [0, -1],
                [2, -2],
                [1, -1],
            ],
            // Поворот на 360 градусов
            [
                [0, -1],
                [0, -1],
                [-2, 0],
                [-2, 0],
            ]
        ],
        // L зеркало
        [
            [1, 0],
            [1, 1],
            [1, 2],
            // Поворот на 90 градусов
            [
                [0, 0],
                [0, 0],
                [1, -1],
                [-1, -1],
            ],
            // Поворот на 180 градусов
            [
                [0, -1],
                [-1, 0],
                [-2, 1],
                [1, 0],
            ],
            // Поворот на 270 градусов
            [
                [2, 0],
                [0, 0],
                [1, -1],
                [1, -1],
            ],
            // Поворот на 360 градусов
            [
                [-2, 0],
                [1, -1],
                [0, 0],
                [-1, 1],
            ]
        ],
        // Лего
        [
            [1, 0],
            [2, 0],
            [1, 1],
            // Поворот на 90 градусов
            [
                [1, -1],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            // Поворот на 180 градусов
            [
                [0, 0],
                [-1, 0],
                [-1, 0],
                [1, -1],
            ],
            // Поворот на 270 градусов
            [
                [1, -1],
                [1, -1],
                [1, -1],
                [0, 0],
            ],
            // Поворот на 360 градусов
            [
                [-2, 0],
                [0, -1],
                [0, -1],
                [-1, -1],
            ]
        ],
        // Молния вправо
        [
            [1, 0],
            [-1, 1],
            [0, 1],
            // Поворот на 90 градусов
            [
                [0, -1],
                [-1, 0],
                [2, -1],
                [1, 0],
            ],
            // Поворот на 180 градусов
            [
                [0, 0],
                [1, -1],
                [-2, 0],
                [-1, -1],
            ],
            // Поворот на 270 градусов
            [
                [0, -1],
                [-1, 0],
                [2, -1],
                [1, 0],
            ],
            // Поворот на 360 градусов
            [
                [0, 0],
                [1, -1],
                [-2, 0],
                [-1, -1],
            ]
        ],
        // Молния влево
        [
            [1, 0],
            [1, 1],
            [2, 1],
            // Поворот на 90 градусов
            [
                [2, -1],
                [0, 0],
                [1, -1],
                [-1, 0],
            ],
            // Поворот на 180 градусов
            [
                [-2, 0],
                [0, -1],
                [-1, 0],
                [1, -1],
            ],
            // Поворот на 270 градусов
            [
                [2, -1],
                [0, 0],
                [1, -1],
                [-1, 0],
            ],
            // Поворот на 360 градусов
            [
                [-2, 0],
                [0, -1],
                [-1, 0],
                [1, -1],
            ]
        ]
    ],
    input = document.getElementsByTagName('input')[0];
    let currentFigure = 0;
        let figureBody = 0;
        let x = 5, y = 15;
        let rotate = 1;

class AppData {
    constructor(){
        this.speed = 0;
        this.score = 0;
        this.color = 0;
    }
    eventListener(){
        const overlay = document.querySelector('.overlay'),
            modal = document.querySelector('.modal'),
            gameArea = document.querySelector('.gameArea');

        modal.addEventListener('click', function(e){
            let target = event.target;
            if(target.classList.contains('easy')){
                this.speed = 1000;
            }else if(target.classList.contains('normal')){
                this.speed = 500;
            }else if(target.classList.contains('hard')){
                this.speed = 200;
            }
            if (target.classList.contains('button')){
                modal.style.display = 'none';
                overlay.style.display = 'none';
                gameArea.style.display = 'block';
                this.startGame();
            }
        }.bind(appData));
    }

    createGameArea() {
        //Объявдляем переменную,создаем div и записываем его в эту переменную
        let tetris = document.createElement('div');
        //Присваеваем класс tetris
        tetris.classList.add('tetris');
        //Создаем 180 элементов,присваеваем класс excel,вставляем в tetris
        for (let i = 1; i < 181; i++ ){
            let excel = document.createElement('div');
            excel.classList.add('excel');
            tetris.appendChild(excel);
        }
        //Вставляем в main tetris
        main.appendChild(tetris);
        
        //Получаем массив эл. excel и с помощью цикла присваваем уникальные координаты каждой ячейке
        let excel = document.querySelectorAll('.excel');
        let i = 0;
        for(let y = 18; y > 0; y--){
            for(let x = 1; x < 11; x++){
                excel[i].setAttribute('posX', x);
                excel[i].setAttribute('posY', y);
                i++;
            }
        }
    }  

    createEl() {

        function createEl(){     
            //функция рандомного цвета 
            function randColor() {
                    var r = Math.floor(Math.random() * (256)),
                        g = Math.floor(Math.random() * (256)),
                        b = Math.floor(Math.random() * (256));
                    return '#' + r.toString(16) + g.toString(16) + b.toString(16);  
                }

            
                appData.color = randColor();
           

            // Создаем функцию рандомных чисел
            function getRandom(){
                return Math.round(Math.random()*(mainArr.length - 1));
            }
            rotate = 1;

           // Результат записываем в переменную
            currentFigure = getRandom();
            
            // Создаем тело фигуры (получаем с помощью рандомного числа, фигуру в массиве mainArr. Каждому элементу добавляем класс figure)
            figureBody = [
                document.querySelector(`[posx = '${x}'][posy = '${y}']`),
                document.querySelector(`[posx = '${x + mainArr[currentFigure][0][0]}'][posy = '${y + mainArr[currentFigure][0][1]}']`),
                document.querySelector(`[posx = '${x + mainArr[currentFigure][1][0]}'][posy = '${y + mainArr[currentFigure][1][1]}']`),
                document.querySelector(`[posx = '${x + mainArr[currentFigure][2][0]}'][posy = '${y + mainArr[currentFigure][2][1]}']`)
            ];
            for (let  i = 0; i < figureBody.length; i++){
                figureBody[i].classList.add('figure'); 
                figureBody[i].style.background = `${appData.color}`; 
                console.log( appData.color);     
            }
            // for (let  i = 0; i < figureBody.length; i++){
            //     figureBody[i].style.background = appData.color[i];    
            // }

        }
        createEl();
        
    }

    showScore(){
        // Отображение очков
        input.value = `Очки: ${this.score}`;
    }

    move(interval){
            // Создаем флаг движения. Пока true фигура летит вниз
            let moveFlag = true;
            // Массив координат фигуры
            let coordinates = [
                [figureBody[0].getAttribute('posx'),figureBody[0].getAttribute('posy')],
                [figureBody[1].getAttribute('posx'),figureBody[1].getAttribute('posy')],
                [figureBody[2].getAttribute('posx'),figureBody[2].getAttribute('posy')],
                [figureBody[3].getAttribute('posx'),figureBody[3].getAttribute('posy')]
            ];
            // Перебираем координаты
            for (let i = 0; i < coordinates.length; i++){
                // Если координата Y нижнего элемента станет 1 - остановить движение; Если внизу есть элемент с классом set - остановить движение
                if(coordinates[i][1] == 1 || document.querySelector(`[posx = '${coordinates[i][0]}'][posy = '${coordinates[i][1]-1}']`).classList.contains('set')){
                    moveFlag = false;
                    break;
                }
            }
            // Если флаг true то у Y  -1, если false присвоить класс set
            if (moveFlag) {
                for (let  i = 0; i < figureBody.length; i++){
                    figureBody[i].classList.remove('figure');
                    figureBody[i].style.background = '';
                    
                }
                figureBody = [
                    document.querySelector(`[posx = '${coordinates[0][0]}'][posy = '${coordinates[0][1]-1}']`),
                    document.querySelector(`[posx = '${coordinates[1][0]}'][posy = '${coordinates[1][1]-1}']`),
                    document.querySelector(`[posx = '${coordinates[2][0]}'][posy = '${coordinates[2][1]-1}']`),
                    document.querySelector(`[posx = '${coordinates[3][0]}'][posy = '${coordinates[3][1]-1}']`)
                ];
                for (let  i = 0; i < figureBody.length; i++){
                    figureBody[i].classList.add('figure');  
                    figureBody[i].style.background = appData.color;                  
                }
                    
            } else {
                for (let  i = 0; i < figureBody.length; i++){
                    figureBody[i].classList.remove('figure');
                    figureBody[i].classList.add('set');
                }
                // Проверка на заполненность ряда, если ряд заполнен убрать класс set  и предвинуть все эл-ты вниз
                for (let i = 1; i < 15 ; i++){
                    let count = 0;
                    for (let k = 1; k < 11; k++) {
                        if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')){
                            count++;
                            if(count == 10){
                                this.score += 10;
                                input.value = `Очки: ${this.score}`;
                                // убираем set и фон
                                for( let m = 1; m < 11; m++ ) {
                                    document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set');
                                    document.querySelector(`[posX = "${m}"][posY = "${i}"]`).style.background = '';
                                }

                                let set = document.querySelectorAll('.set');

                                let colors = [];
                                set.forEach((el, i) => {
                                   let color = el.style.backgroundColor;
                                   colors[i] = color;
                                });

                                let newSet = [];
                                for (let s = 0; s < set.length; s++){
                                    let setCordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
                                    set[s].style.background = '';
                                    if (setCordinates[1] > i) {
                                        set[s].classList.remove('set');
                                        
                                        newSet.push(document.querySelector(`[posX = "${setCordinates[0]}"][posY = "${setCordinates[1] - 1}"]`));
                                       
                                        
                                    }
                                }
                                for( let a = 0; a < newSet.length; a++) {
                                    newSet[a].classList.add('set');
                                    newSet[a].style.background = colors[a];  
                                }
                                i--;
                            }
                        }
                    }
                }
                // Если элемент окажется выше 15 строки - остановить игру
                for (let n = 1; n < 11; n++){
                    if(document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')){
                        clearInterval(interval);
                        modalEnd.style.transform = "translate(-50%, 0%)";
                        gameover.textContent = `Ваши очки: ${this.score}`;
                        // alert(`Игра окончена. Ваши очки: ${this.score}`);
                        break;
                    }
                }
               
                // Снова создать элемент
                this.createEl();    
            } 
  
    }

    controls(){
        let flag = true;

        function moving (e) {
           let target = e.target;

            let coordinate1 = [figureBody[0].getAttribute('posx'),figureBody[0].getAttribute('posy')];
            let coordinate2 = [figureBody[1].getAttribute('posx'),figureBody[1].getAttribute('posy')];
            let coordinate3 = [figureBody[2].getAttribute('posx'),figureBody[2].getAttribute('posy')];
            let coordinate4 = [figureBody[3].getAttribute('posx'),figureBody[3].getAttribute('posy')];
            //Определить новое положение фигуры в пространстве
            function getNewState(a){
                flag = true;
                let figureNew = [
                    document.querySelector(`[posx = '${+coordinate1[0] + a}'][posy = '${coordinate1[1]-1}']`),
                    document.querySelector(`[posx = '${+coordinate2[0] + a}'][posy = '${coordinate2[1]-1}']`),
                    document.querySelector(`[posx = '${+coordinate3[0] + a}'][posy = '${coordinate3[1]-1}']`),
                    document.querySelector(`[posx = '${+coordinate4[0] + a}'][posy = '${coordinate4[1]-1}']`)
                ];
                
                for(let i = 0; i < figureNew.length; i++){
                    // Если элемента не существует или он имеет класс set присвоить  flag false
                    if(!figureNew[i] || figureNew[i].classList.contains('set')){
                        flag = false;
                    }
                }
                // Если все ок то перезаписать координаты
                if(flag == true){
                    for (let  i = 0; i < figureBody.length; i++){
                        figureBody[i].classList.remove('figure');
                        figureBody[i].style.background = '';
                    }
                    figureBody = figureNew;
                    for (let  i = 0; i < figureBody.length; i++){
                        figureBody[i].classList.add('figure');
                        figureBody[i].style.background = appData.color;
                    }
                }
            }
            if(e.keyCode == 37 || target.classList.contains('left')){
                getNewState(-1);
            }else if(e.keyCode == 39 || target.classList.contains('right')){
                getNewState(1);
            }else if(e.keyCode == 40 || target.classList.contains('down')){
                appData.move();
            }else if(e.keyCode == 38 || target.classList.contains('top')){
                flag = true;

                let figureNew = [
                    document.querySelector(`[posx = '${+coordinate1[0] + mainArr[currentFigure][rotate+2][0][0]}'][posy = '${+coordinate1[1] + mainArr[currentFigure][rotate+2][0][1]}']`),
                    document.querySelector(`[posx = '${+coordinate2[0] + mainArr[currentFigure][rotate+2][1][0]}'][posy = '${+coordinate2[1] + mainArr[currentFigure][rotate+2][1][1]}']`),
                    document.querySelector(`[posx = '${+coordinate3[0] + mainArr[currentFigure][rotate+2][2][0]}'][posy = '${+coordinate3[1] + mainArr[currentFigure][rotate+2][2][1]}']`),
                    document.querySelector(`[posx = '${+coordinate4[0] + mainArr[currentFigure][rotate+2][3][0]}'][posy = '${+coordinate4[1] + mainArr[currentFigure][rotate+2][3][1]}']`)
                ];
                
                for(let i = 0; i < figureNew.length; i++){
                    // Если элемента не существует или он имеет класс set присвоить  flag false
                    if(!figureNew[i] || figureNew[i].classList.contains('set')){
                        flag = false;
                    }
                }
                // Если все ок то перезаписать координаты
                if(flag == true){
                    for (let  i = 0; i < figureBody.length; i++){
                        figureBody[i].classList.remove('figure');
                        figureBody[i].style.background = '';
                    }
                    figureBody = figureNew;

                    for (let  i = 0; i < figureBody.length; i++){
                        figureBody[i].classList.add('figure');
                        figureBody[i].style.background = appData.color;
                    }
                    if(rotate < 4){
                        rotate++;
                    }else{
                        rotate = 1;
                    }
                }
            }
        }

        // Событие нажатия кнопки
        window.addEventListener('keydown', moving);
        window.addEventListener('click', moving);

    }

    startGame () {
        this.createGameArea();
        this.createEl();
        this.showScore();
        this.move();
        this.controls();
        
        // Запуск функции с интервалом
        let interval = setInterval(() => {
            this.move(interval);
        }, this.speed);
    }
}



let appData = new AppData();
appData.eventListener();



yes.addEventListener('click', () => {
    modalEnd.style.transform = "translate(-400%, 0%)";
    const excel = document.querySelectorAll('.excel');
    excel.forEach((el) => {
        el.style.background = "";
        el.classList.remove('set');
        el.classList.remove('figure');
    });
        appData.createEl();
        appData.showScore();
        appData.move();
        appData.controls();

        // Запуск функции с интервалом
        let interval = setInterval(() => {
            appData.move(interval);
        }, appData.speed);
}); 
   
no.addEventListener('click', () => {
    modalEnd.style.transform = "translate(-400%, 0%)";
    GameOver.style.transform = "scale(1)";
});




