"use strict";

var taskNotification = document.querySelector("[task-notification]");
var finishNotification = document.querySelector("[finish-notification]");
var listContainer = document.querySelector("[list-container]");
var input = document.querySelector(".input-list"); // Corrected the selector

var inputSubmit = document.querySelector(".button-input-submit"); // Corrected the selector

var KEY = "TODOLIST";
var storeData = [];
inputSubmit.addEventListener("click", function () {
  storeData.push({
    id: Date.now(),
    text: input.value,
    finish: false
  });
  saveData();
  render(); // Reset input value to empty string after adding item

  input.value = "";
});

function render() {
  removeListElement();
  var finish = 0;
  var task = 0;
  storeData.forEach(function (data) {
    data.finish ? finish++ : task++;
    var listItem = document.createElement("div");
    var text = document.createElement("div");
    var icon = document.createElement("i");
    icon.classList.add("fas", "fa-trash-alt", "delete-list");
    icon.addEventListener("click", function () {
      return deleteList(data.id);
    });
    listItem.classList.add("list-item");
    text.classList.add("list-text");
    text.innerHTML = data.text;
    listItem.appendChild(text);
    listItem.appendChild(icon);
    listContainer.appendChild(listItem);
  });
  finishNotification.textContent = "Finish ".concat(finish);
  taskNotification.textContent = "Task ".concat(task);
}

function removeListElement() {
  listContainer.innerHTML = ""; // Simplified removing child nodes
}

function deleteList(id) {
  storeData = storeData.filter(function (data) {
    return data.id !== id;
  });
  saveData();
  render();
}

function saveData() {
  localStorage.setItem(KEY, JSON.stringify(storeData));
}

function getData() {
  var storedData = localStorage.getItem(KEY);
  storeData = storedData ? JSON.parse(storedData) : [];
}

getData();
render();
//# sourceMappingURL=main.dev.js.map
