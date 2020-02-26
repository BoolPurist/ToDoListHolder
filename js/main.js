/* jshint esversion: 6 */
(function() {
  "use strict";
  function List() {
    // Creating main container.

    let list = document.createElement("div");
    list.classList.add("list");
    document.body.appendChild(list);

    return list;
  }

  function ToDoBoxRemovable(text) {
    let toDoBox = document.createElement("div");
    toDoBox.classList.add("toToDoBoxRemovable");
    let removeIcon = document.createElement("div");
    removeIcon.classList.add("removable");
    let textContent = document.createElement("p");
    textContent.classList.add("line");
    textContent.innerText = text;
    toDoBox.appendChild(removeIcon);
    toDoBox.appendChild(textContent);

    return toDoBox;
  }

  let item = List();
  item.appendChild(ToDoBoxRemovable("asdfa sd".repeat(50)));
})();
