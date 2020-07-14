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
    let words = [];
    let elements = document.querySelectorAll(".dynamic-text");
    for (let i = 0; i < elements.length; i++) {
      console.log(elements[i].textContent);
      let arr = elements[i].textContent.split("");
      words.push(arr);
    }
    //Условие
    let tipe = () => {};
    let tiping = setInterval(tipe, 2000);
    console.log(words);
  };
  tipped();
});

@@include("particle.js");
