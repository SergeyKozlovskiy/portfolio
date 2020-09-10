document.addEventListener("DOMContentLoaded", () => {
  //menu
  const dinamicBg = () => {
    const menu = document.querySelector('menu');
    let top = window.pageYOffset;
    if(top !== 0){}
      
    
    console.log(top);
  };
  dinamicBg();
  // webp
  const webP = () => {
    function testWebP(callback) {
      var webP = new Image();
      webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
      };
      webP.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    testWebP(function (support) {
      if (support == true) {
        document.querySelector("body").classList.add("webp");
      } else {
        document.querySelector("body").classList.add("no-webp");
      }
    });
    const links = document.querySelectorAll("ul>li>a");
    links.forEach((el) => {
      el.addEventListener("mouseover", () => {
        el.classList.add("active-link");
      });
      el.addEventListener("mouseout", () => {
        el.classList.remove("active-link");
      });
    });
  };
  webP();

  //tipped
  const tipped = () => {
    // массив для хранения всех стpок с классом  dynamic-text
    let words = [];
    //получаем эл ты .dynamic-text
    let elements = document.querySelectorAll(".dynamic-text");
    elements.forEach((el, i) => {
      let arr = elements[i].textContent.split("");
      words.push(arr);
    });

    
  // проверяем виден ли объект пользователю
    let visible = (target, i) => {
  // Все позиции элемента
  var targetPosition = {
      top: window.pageYOffset + target.getBoundingClientRect().top,
      left: window.pageXOffset + target.getBoundingClientRect().left,
      right: window.pageXOffset + target.getBoundingClientRect().right,
      bottom: window.pageYOffset + target.getBoundingClientRect().bottom
    },
  // Получаем позиции окна
    windowPosition = {
      top: window.pageYOffset,
      left: window.pageXOffset,
      right: window.pageXOffset + document.documentElement.clientWidth,
      bottom: window.pageYOffset + document.documentElement.clientHeight
    };

  if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
    targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
    targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
    targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
  // Если элемент полностью видно, то запускаем следующий код
    target.textContent = '';
    let j = 0;
    let tipe = () => {
      target.textContent += `${words[i][j]}`;
      j++;
      if(j === words[i].length){
        target.classList.remove('dynamic-text');
        clearInterval(timerid);
      }

    
    };
    let timerid = setInterval(tipe, 100);

    console.log(words[i].length);
  } else {
    // Если элемент не видно, то запускаем этот код
    console.clear();
  }
    };

    for (let i = 0; i < elements.length; i++){
      visible(elements[i], i);
    }

    // Запускаем функцию при прокрутке страницы
    window.addEventListener('scroll', function() {
    for (let i = 0; i < elements.length; i++){
      visible(elements[i], i);
    }
  });      
  };
  tipped();

});


