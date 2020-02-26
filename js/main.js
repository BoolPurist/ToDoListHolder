/* jshint esversion: 6 */
(function() {
  "use strict";
  let list = document.getElementsByClassName("list");
  let adderBox = document.querySelector(".adderForToDo");
  let adderSign = adderBox.querySelector(".adderSign");
  adderSign.addEventListener(
    "click",
    function(event) {
      let self = event.currentTarget;
      let textarea = self.parentNode.querySelector("textarea");
      let text = textarea.value;
      if (text.length !== 0) {
        let toDoBoxRemovable = ToDoBoxRemovable(text);
        list[0].appendChild(toDoBoxRemovable);
        textarea.value = "";
      }
    },
    false
  );
  adderSign.addEventListener(
    "mouseover",
    function(event) {
      let leftBar = event.currentTarget.querySelector(".leftBar");
      let rightBar = event.currentTarget.querySelector(".rightBar");
      leftBar.classList.add("hover");
      rightBar.classList.add("hover");
    },
    false
  );
  adderSign.addEventListener(
    "mouseout",
    function(event) {
      let leftBar = event.currentTarget.querySelector(".leftBar");
      let rightBar = event.currentTarget.querySelector(".rightBar");
      leftBar.classList.remove("hover");
      rightBar.classList.remove("hover");
    },
    false
  );

  // Testing.
  let testString = "xxxx".repeat(80);
  list[0].appendChild(ToDoBoxRemovable(testString));
  // EndTesting.
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
