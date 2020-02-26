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
      } else {
        console.log("asdfsa");
      }
    },
    false
  );
  // Testing.
  let testString = "xxxx".repeat(80);
  list[0].appendChild(ToDoBoxRemovable(testString));
  // Returns a ToDoBox with text and a sign to click on. Clicking on that removes the toDoBox.

  function ToDoBoxRemovable(text) {
    let toDoBoxRemovable = document.createElement("div");
    toDoBoxRemovable.classList.add("toToDoBoxRemovable");
    let removable = document.createElement("div");
    removable.classList.add("removable");
    removable.addEventListener("click", callbackClick, false);
    let line = document.createElement("p");
    line.classList.add("line");
    line.innerText = text;
    toDoBoxRemovable.appendChild(removable);
    toDoBoxRemovable.appendChild(line);
    return toDoBoxRemovable;

    function callbackClick(event) {
      event.currentTarget.parentNode.remove();
    }
  }
})();
