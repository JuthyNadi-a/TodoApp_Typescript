"use strict";
const list = document.querySelector("#list");
const form = document.getElementById("new-task-form");
const input = document.querySelector("#new-task-title");
const clearButton = document.querySelector('#clearBtn');
const tasks = loadTasks();
tasks.forEach(addListItem);
const deleteItem = () => {
    tasks.splice(0);
    saveTasks();
};
form === null || form === void 0 ? void 0 : form.addEventListener("submit", e => {
    e.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) == "" || (input === null || input === void 0 ? void 0 : input.value) == null)
        return;
    const newTask = {
        title: input.value,
        completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    addListItem(newTask);
    input.value = "";
    location.reload();
});
function addListItem(task) {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        saveTasks();
    });
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<span class="material-icons">
    close</span>`;
    deleteBtn.addEventListener("click", () => deleteItem());
    label.append(checkbox, task.title);
    item.append(label);
    list === null || list === void 0 ? void 0 : list.append(item);
}
function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function loadTasks() {
    const taskJSON = localStorage.getItem("TASKS");
    if (taskJSON == null)
        return [];
    return JSON.parse(taskJSON);
}
clearButton.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
});
