import { arr } from "./db.js";
// let cart_ids = [];
let place = document.querySelector(".slots");
let showFive = document.querySelector("#show_five");
let showFull = document.querySelector("#show_full");

export function reloadSlots(arr) {
  place.innerHTML = "";
  for (let item of arr) {
    let slot = document.createElement("div");
    let photo = document.createElement("div");
    let img = document.createElement("img");
    let descr = document.createElement("div");
    let slotName = document.createElement("h3");
    let p = document.createElement("p");
    let icons = document.createElement("div");
    let price = document.createElement("div");
    let priceImg = document.createElement("img");
    let star = document.createElement("div");
    let starImg = document.createElement("img");
    let pack = document.createElement("div");
    let packImg = document.createElement("img");
    let button = document.createElement("button");
    // b

    slot.classList.add("slot");
    photo.classList.add("photo");
    descr.classList.add("descr");
    slotName.classList.add("slot-name");
    p.classList.add("descr-p");
    icons.classList.add("icons");
    button.classList.add("to-star");

    packImg.src = "./img/box.svg";
    priceImg.src = "./img/dollar.svg";
    starImg.src = "./img/star.svg";
    slotName.innerHTML = item.category;
    button.innerHTML = "В избранное";
    img.src = item.image;
    p.innerHTML = item.description;

    place.append(slot);
    slot.append(photo);
    photo.append(img);
    slot.append(descr);
    descr.append(slotName, p, icons, button);
    icons.append(price, star, pack);
    price.append(priceImg, item.price);
    star.append(starImg, item.rating.rate);
    pack.append(packImg, item.rating.count);
  }
}
reloadSlots(arr.slice(0, 8));

// showFive.onclick = () => {

//   reloadSlots(arr.slice(0, 8));
//   showFive.setAttribute("disabled", true);
//   showFull.removeAttribute("disabled");
// };

// showFull.onclick = () => {
//   reloadSlots(arr);
//   showFull.setAttribute("disabled", true);
//   showFive.removeAttribute("disabled");
//   // showFull.setAttribute("disabled", true);
// };

let open = document.getElementById("openModalBtn");
let close = document.getElementById("closeModalBtn");
let modal = document.querySelector(".modalBackground");

open.addEventListener("click", function () {
  console.log("click");
  modal.classList.add("active");
});

close.addEventListener("click", function () {
  modal.classList.remove("active");
});

let cart = [];
const errorModal = document.getElementById("errorModal");
const closeModalBtn = document.getElementById("closeModal");

function openErrorModal() {
  errorModal.style.display = "block";
  errorModal.style.left = "50%";
  setTimeout(closeErrorModal, 2000);
}

function closeErrorModal() {
  errorModal.style.display = "none";
}

function favoriteTovar() {
  let favorite = document.querySelectorAll(".to-star");
  favorite.forEach((item, idx) => {
    item.onclick = () => {
      console.log(arr[idx]);
      let newItem = arr[idx];
      if (!IsTovar(newItem)) {
        cart.push(newItem);
        reloadCartItems();
      } else {
        openErrorModal();
        setTimeout;
      }
    };
  });

  function IsTovar(newItem) {
    for (let item of cart) {
      if (item.id === newItem.id) {
        return true;
      }
    }
  }
}
favoriteTovar();

function reloadCartItems() {
  let place = document.querySelector(".modal__box");
  place.innerHTML = "";
  for (let item of cart) {
    let elem = document.createElement("div");
    let box1 = document.createElement("div");
    let box2 = document.createElement("div");
    let div = document.createElement("div");
    let img = document.createElement("img");
    let name = document.createElement("p");
    let price = document.createElement("p");
    let plus = document.createElement("button");
    let minus = document.createElement("button");
    let amount = document.createElement("span");

    elem.classList.add("elem");
    box1.classList.add("elem__box");
    box2.classList.add("elem__box");

    img.src = item.image;

    name.innerHTML = item.title.split(" ")[0];
    price.innerHTML = item.price;
    plus.innerHTML = "+";
    amount.innerHTML = "1";
    minus.innerHTML = "-";

    div.append(name, price);
    box1.append(img, div);
    box2.append(plus, amount, minus);
    elem.append(box1, box2);
    place.append(elem);

    let amountNum = 1;
    plus.onclick = () => {
      console.log();
      amountNum++;
      minus.disabled = false;
      amount.textContent = amountNum;
    };
    minus.onclick = () => {
      amountNum--;
      amount.textContent = amountNum;
      if (amountNum === 1) {
        console.log("minus");
        minus.disabled = true;
      }
    };
  }

  let totalPrice = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
  console.log(totalPrice);
  let price2 = document.querySelector(".price");
  price2.innerHTML = totalPrice.toFixed(2) + " $";
}

function allArr() {
  reloadSlots(arr);
  favoriteTovar();
}
function arrEight() {
  reloadSlots(arr.slice(0, 8));
  favoriteTovar();
}

showFull.onclick = () => {
  allArr();
  showFull.setAttribute("disabled", true);
  showFive.removeAttribute("disabled");
};
showFive.onclick = () => {
  arrEight();
  showFive.setAttribute("disabled", true);
  showFull.removeAttribute("disabled");
};
