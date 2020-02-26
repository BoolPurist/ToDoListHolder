/* jshint esversion: 6 */
(function() {
  "use strict";
  // Testing.
  let list = document.getElementsByClassName("list");
  console.log(list);
  let testString = "xxxx".repeat(80);
  list[0].appendChild(ToDoBoxRemovable(testString));
  // Returns a ToDoBox with text and a sign to click on. Clicking on that removes the toDoBox.
  function ToDoBoxRemovable(text) {
    let toDoBoxRemovable = document.createElement("div");
    toDoBoxRemovable.classList.add("toToDoBoxRemovable");
    let removable = document.createElement("div");
    removable.classList.add("removable");
    let line = document.createElement("p");
    line.classList.add("line");
    line.innerText = text;
    toDoBoxRemovable.appendChild(removable);
    toDoBoxRemovable.appendChild(line);
    return toDoBoxRemovable;
  }
})();
