/* jshint esversion: 6 */
(function() {
  "use strict";
  let toDoContainerName = "allToDos";

  let list = document.querySelector(".list");
  let adderBox = document.querySelector(".adderForToDo");
  let adderSign = adderBox.querySelector(".adderSign");

  let toDosArray = window.localStorage.getItem(toDoContainerName);
  if (
    toDosArray === null ||
    toDosArray === undefined ||
    toDosArray.length === 0
  ) {
    toDosArray = [];
  } else {
    toDosArray = toDosArray.split(",");

    toDosArray.forEach(function(item) {
      let toDoBoxRemovable = ToDoBoxRemovable(item);
      list.appendChild(toDoBoxRemovable);
    });
  }

  // If the website is used with a touch screen.
  document.addEventListener("touchstart", callbackTouch, false);
  document.addEventListener("touchmove", callbackTouch, false);
  document.addEventListener("touchend", callbackTouch, false);

  // Check if the touch cursor is in a sign.
  function callbackTouch(event) {
    // prevents error message in console because of not found touch cursors.
    if (
      event.changedTouches == null ||
      event.changedTouches === undefined ||
      event.changedTouches.length === 0
    ) {
      return;
    }
    let currentX = event.changedTouches[0].pageX;
    let currentY = event.changedTouches[0].pageY;
    let removeHitboxClass = "removable";

    // Getting the one adderSign hitbox
    let adderSignHitbox = document.body
      .querySelector(".wrapper")
      .querySelector(".adderForToDo")
      .querySelector(".adderSign");
    // Checking if cursor is on the adderSign while touching.
    TouchInBounding(adderSignHitbox);

    let removeHitboxes = document.body
      .querySelector(".wrapper")
      .querySelector(".list")
      .querySelectorAll(".toToDoBoxRemovable");
    // Preventing error message in the browser console if there is no toDoBoxRemovable there.
    if (
      removeHitboxes === null ||
      removeHitboxes === undefined ||
      removeHitboxes.length === 0
    ) {
      return;
    }
    removeHitboxes.forEach(function(element) {
      let removable = element.querySelector(".removable");
      TouchInBounding(removable);
    });

    // Change shape of adder sign or remove sign when the touching cursor is in the respective hitbox.
    function TouchInBounding(boundingBox) {
      let boundingBoxRec = boundingBox.getBoundingClientRect();
      // check if touching cursor is in the bounding box.
      if (
        boundingBoxRec.bottom > currentY &&
        boundingBoxRec.top < currentY &&
        boundingBoxRec.left < currentX &&
        boundingBoxRec.right > currentX
      ) {
        // check if the shape is already right when cursor is inside hitbox.
        if (!boundingBox.classList.contains("hover")) {
          let leftBar = boundingBox.querySelector(".leftBar");
          let rightBar = boundingBox.querySelector(".rightBar");
          leftBar.classList.add("hover");
          rightBar.classList.add("hover");
        }
      } else {
        // check if the shape is already right when cursor is outside hitbox.
        let leftBar = boundingBox.querySelector(".leftBar");
        let rightBar = boundingBox.querySelector(".rightBar");
        if (
          leftBar.classList.contains("hover") &&
          rightBar.classList.contains("hover")
        ) {
          leftBar.classList.remove("hover");
          rightBar.classList.remove("hover");
        }
      }
    }

    // querring all removable signs.
  }

  adderSign.addEventListener(
    "click",
    function(event) {
      // Grab the text of the textarea from the adder item of the next toDo item.
      let self = event.currentTarget;
      let textarea = self.parentNode.querySelector("textarea");
      let text = textarea.value;
      console.log(text);
      if (text.length !== 0) {
        // Prepares text of the textarea of the adder item and saved into the local storage as memory what toDos the user has entered.
        text = text.trim();
        text = removeExtraBlanks(text);
        toDosArray.push(text);
        window.localStorage.setItem(toDoContainerName, toDosArray);
        // Clears the text content when pressed the adder sign so new text content can be entered.
        let toDoBoxRemovable = ToDoBoxRemovable(text);
        list.appendChild(toDoBoxRemovable);
        textarea.value = "";
      }

      // Alters a string that it has no more than one space in a row.
      // The functions assumes that the string was trimmed before.
      function removeExtraBlanks(string) {
        let prevSpace = false;
        let resultString = "";
        for (let i = 0; i < string.length; i++) {
          let currentLetter = string.charAt(i);
          if (currentLetter === " ") {
            if (!prevSpace) {
              prevSpace = true;
              resultString += currentLetter;
            }
          } else {
            prevSpace = false;
            resultString += currentLetter;
          }
        }
        return resultString;
      }
    },
    false
  );
  adderSign.addEventListener("mouseover", callbackMouseOver, false);
  adderSign.addEventListener("mouseout", callbackMouseOut, false);

  function callbackMouseOver(event) {
    let leftBar = event.currentTarget.querySelector(".leftBar");
    let rightBar = event.currentTarget.querySelector(".rightBar");
    leftBar.classList.add("hover");
    rightBar.classList.add("hover");
  }

  function callbackMouseOut(event) {
    let leftBar = event.currentTarget.querySelector(".leftBar");
    let rightBar = event.currentTarget.querySelector(".rightBar");
    leftBar.classList.remove("hover");
    rightBar.classList.remove("hover");
  }

  // Returns a ToDoBox with text and a sign to click on. Clicking on that removes the toDoBox.
  function ToDoBoxRemovable(text) {
    let toDoBoxRemovable = document.createElement("div");
    toDoBoxRemovable.classList.add("toToDoBoxRemovable");

    let removable = document.createElement("div");
    removable.classList.add("removable");
    removable.addEventListener("click", callbackClick, false);
    removable.addEventListener("mouseover", callbackHoverIN, false);
    removable.addEventListener("mouseout", callbackHoverOut, false);

    let leftBar = document.createElement("div");
    leftBar.classList.add("leftBar");
    let rightBar = document.createElement("div");
    rightBar.classList.add("rightBar");
    removable.appendChild(leftBar);
    removable.appendChild(rightBar);

    let line = document.createElement("p");
    line.classList.add("line");
    line.innerText = text;
    toDoBoxRemovable.appendChild(removable);
    toDoBoxRemovable.appendChild(line);
    return toDoBoxRemovable;

    function callbackClick(event) {
      let toDoTextToRemove = event.currentTarget.parentNode.querySelector("p")
        .innerText;
      console.log(toDosArray.indexOf(toDoTextToRemove));
      toDosArray.splice(toDosArray.indexOf(toDoTextToRemove), 1);
      console.log(toDosArray);
      window.localStorage.setItem(toDoContainerName, toDosArray);
      event.currentTarget.parentNode.remove();
    }

    function callbackHoverIN(event) {
      let leftBar = event.currentTarget.querySelector(".leftBar");
      let rightBar = event.currentTarget.querySelector(".rightBar");
      leftBar.classList.add("hover");
      rightBar.classList.add("hover");
    }

    function callbackHoverOut(event) {
      let leftBar = event.currentTarget.querySelector(".leftBar");
      let rightBar = event.currentTarget.querySelector(".rightBar");
      leftBar.classList.remove("hover");
      rightBar.classList.remove("hover");
    }
  }
})();
