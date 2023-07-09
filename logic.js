let add = document.querySelector(".add");
let main = document.querySelector(".main");
let del = document.querySelector(".delete");
let box2 = document.querySelectorAll(".box2");

let colorBoxes = document.querySelectorAll(".color_boxes");
let isDelete = false;
let isLocked = false;
//*************************************************** */
let colors = document.querySelectorAll(".color");
let arr = [];
for (let i = 0; i < colors.length; i++) {
  arr.push(colors[i].classList.item(1));
}
//***************************************************** */
add.addEventListener("click", creation);
del.addEventListener("click", deleteHelper);
for (let i = 0; i < box2.length; i++) {
  box2[i].addEventListener("click", locking);
}
//***************************************************** */
for (let i = 0; i < colorBoxes.length; i++) {
  colorBoxes[i].addEventListener("click", filterTickets);
}
function createModal(id) {
  let cColor = "black";
  let modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  modal.innerHTML = `
          <textarea class="contentarea"
          placeholder="Enter some Task"
          ></textarea>
          <div class="pallet_container">
              <div class="pallet_color pink"></div>
              <div class="pallet_color blue"></div>
              <div class="pallet_color green"></div>
              <div class="pallet_color orange "></div>
              <button class = 'btn'> Go </button>
          </div>`;

  main.appendChild(modal);
  let overlay = document.querySelector(".overlay");
  overlay.style.display = "block";

  // color choose
  let allColors = modal.querySelectorAll(".pallet_color");
  for (let i = 0; i < allColors.length; i++) {
    allColors[i].addEventListener("click", function (e) {
      let ele = e.currentTarget;
      cColor = ele.classList[1];
      add_clk_Class(ele, "clk", allColors, 2);
    });
  }
  // color code
  modal.querySelector(".btn").addEventListener("click", function (e) {
    // get text, color
    overlay.style.display = "none";
    let textarea = modal.querySelector("textarea");
    let text = textarea.value;
    // destory;
    modal.remove();
    // return text color
    createTicket(id, cColor, text);
  });
}
function add_clk_Class(ele, className, allList, num) {
  let secondClass = ele.classList[num];
  if (secondClass == className) {
    ele.classList.remove(className);
  } else {
    for (let i = 0; i < allList.length; i++) {
      allList[i].classList.remove(className);
    }
    ele.classList.add(className);
  }
}
function handleCreation(id) {
  createModal(id);
}
function creation() {
  if (isLocked == true) {
    return;
  }
  let id = idCreate();
  handleCreation(id);
}
function createTicket(id, color, text) {
  let ticket = document.createElement("div");
  ticket.setAttribute("class", "ticket");
  ticket.innerHTML = `
  <div class="ticket_head ${color}"></div>
        <div class="ticket_content">
          <div class="ticket_id">
          #${id}
          </div>
          <textarea>${text}</textarea>
        </div>
  `;
  main.appendChild(ticket);
  let tikHead = ticket.querySelector(".ticket_head");
  tikHead.addEventListener("click", changeColor);
  ticket.addEventListener("click", checkendStatus);
}
function changeColor(e) {
  if (isLocked == true) {
    return;
  }
  let ele = e.currentTarget;
  let currColor = ele.classList.item(1);
  let currIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == currColor) {
      currIndex = i;
      break;
    }
  }
  let appIndex = (currIndex + 1) % arr.length;
  let appClass = arr[appIndex];
  let classes = ele.classList;
  classes.remove(currColor);
  classes.add(appClass);
}
function filterTickets(e) {
  if (isLocked == true) {
    return;
  }
  let ele = e.currentTarget;
  let childElem = ele.children;
  let clickedColor = childElem[0].classList[1];
  let secondClass = ele.classList[1];
  if (secondClass == "clicked") {
    ele.classList.remove("clicked");
    changer(main, "--default", main);
    show_All();
  } else {
    for (let i = 0; i < colorBoxes.length; i++) {
      colorBoxes[i].classList.remove("clicked");
    }
    ele.classList.add("clicked");
    let styling = "--" + clickedColor;
    changer(childElem[0], styling, main);
    show_colorSpecific(clickedColor);
  }
}
function changer(extract, cssProperty, apply) {
  let computedStyles = window.getComputedStyle(extract);
  let val = computedStyles.getPropertyValue(cssProperty).trim();
  apply.style.backgroundImage = val;
}
function show_colorSpecific(color) {
  let allticket = document.querySelectorAll(".ticket");
  for (let i = 0; i < allticket.length; i++) {
    let head = allticket[i].children[0];
    let headClasses = head.classList;
    let colorHead = headClasses[1];
    if (colorHead == color) {
      allticket[i].style.display = "block";
    } else {
      allticket[i].style.display = "none";
    }
  }
}
function show_All() {
  let allticket = document.querySelectorAll(".ticket");
  for (let i = 0; i < allticket.length; i++) {
    allticket[i].style.display = "block";
  }
}
function deleteHelper(e) {
  if (isLocked == true) {
    return;
  }
  let ele = e.currentTarget;
  let lastClass = ele.classList[2];
  if (lastClass == "clicked") {
    ele.classList.remove("clicked");
    isDelete = false;
  } else {
    ele.classList.add("clicked");
    isDelete = true;
  }
}
function checkendStatus(e) {
  if (isDelete == true) {
    e.currentTarget.remove();
  }
}
function locking(e) {
  let ele = e.currentTarget;
  let lastClass = ele.classList[2];
  if (lastClass != "clicked") {
    for (let i = 0; i < box2.length; i++) {
      box2[i].classList.remove("clicked");
    }
    ele.classList.add("clicked");
    if (ele.classList[0] == "lock") {
      isLocked = true;
    } else {
      isLocked = false;
    }
    textEditHandler();
  }
}
function textEditHandler() {
  let text_area = document.querySelectorAll("textarea");
  if (text_area.length != 0) {
    for (let i = 0; i < text_area.length; i++) {
      if (isLocked == true) {
        text_area[i].setAttribute("readonly", "");
      } else {
        text_area[i].removeAttribute("readonly", "");
      }
    }
  }
}
