const taskNotification = document.querySelector("[task-notification]");
const finishNotification = document.querySelector("[finish-notification]");
const listContainer = document.querySelector("[list-container]");
const input = document.querySelector(".input-list"); // Corrected the selector
const inputSubmit = document.querySelector(".button-input-submit"); // Corrected the selector

const KEY = "TODOLIST";
let storeData = [];

inputSubmit.addEventListener("click", () => {
  storeData.push({
    id: Date.now(),
    text: input.value,
    finish: false
  });
  saveData();
  render();

  // Reset input value to empty string after adding item
  input.value = "";
});

function render() {
  removeListElement();

  let finish = 0;
  let task = 0;

  storeData.forEach((data) => {
    data.finish ? finish++ : task++;

    const listItem = document.createElement("div");
    const text = document.createElement("div");
    const icon = document.createElement("i");

    icon.classList.add("fas", "fa-trash-alt", "delete-list");
    icon.addEventListener("click", () => deleteList(data.id));

    listItem.classList.add("list-item");
    text.classList.add("list-text");
    text.innerHTML = data.text;

    listItem.appendChild(text);
    listItem.appendChild(icon);
    listContainer.appendChild(listItem);
  });

  finishNotification.textContent = `Finish ${finish}`;
  taskNotification.textContent = `Task ${task}`;
}

function removeListElement() {
  listContainer.innerHTML = ""; // Simplified removing child nodes
}

function deleteList(id) {
  storeData = storeData.filter(data => data.id !== id);
  saveData();
  render();
}

function saveData() {
  localStorage.setItem(KEY, JSON.stringify(storeData));
}

function getData() {
  const storedData = localStorage.getItem(KEY);
  storeData = storedData ? JSON.parse(storedData) : [];
}

getData();
render();
