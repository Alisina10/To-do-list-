const inputBox = document.getElementById("input-box");
const addBtn = document.getElementById("add-btn"); 
const todoList = document.getElementById("todo-list");

document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", () => {
  const task = inputBox.value.trim();
  if (!task) return;

  addTask(task);
  inputBox.value = "";
  saveTasks();
});


// Function to add a task

function addTask(taskText, isCompleted = false) {
  const li = document.createElement("li");
  li.textContent = taskText;

  if (isCompleted) li.classList.add("checked");


  // Create a delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  li.addEventListener("click", () => {
    li.classList.toggle("checked");
    saveTasks();
  });

  todoList.appendChild(li);
}


// Function to save tasks to localStorage

function saveTasks() {
  const tasks = [];
  todoList.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      completed: li.classList.contains("checked"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Function to load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTask(task.text, task.completed);
  });
}
