document.addEventListener("DOMContentLoaded", () => {
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
    // массив для хранения всех сток с классом  dynamic-text
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

  // particlesJS
const particlesJs = () => {
  particlesJS("particles-js", {
    particles: {
      number: { value: 160, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 5 },
        image: { src: "img/github.svg", width: 100, height: 100 },
      },
      opacity: {
        value: 1,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: false, speed: 4, size_min: 0.3, sync: false },
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 600 },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "bubble" },
        onclick: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: { distance: 250, size: 0, duration: 2, opacity: 0, speed: 3 },
        repulse: { distance: 400, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });
};
particlesJs();
;
});


