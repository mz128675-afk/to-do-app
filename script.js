// One array holds all tasks. Each task has text and a done flag.
// The list is saved in localStorage, so it survives a page refresh.

const STORAGE_KEY = "todo-tasks";

let tasks = loadTasks();

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Build the list HTML with a loop, then show how many tasks are left.
function renderTasks() {
  let html = "";
  let remaining = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].done) {
      remaining++;
    }
    const doneClass = tasks[i].done ? "task-done" : "";
    const checked = tasks[i].done ? "checked" : "";
    html += `
      <li class="list-group-item task-item">
        <input type="checkbox" class="form-check-input" ${checked} onclick="toggleTask(${i})">
        <p class="task-text ${doneClass}">${tasks[i].text}</p>
        <button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteTask(${i})">Delete</button>
      </li>`;
  }

  document.getElementById("task-list").innerHTML = html;
  document.getElementById("task-count").textContent =
    tasks.length + " task(s) — " + remaining + " remaining";
}

function addTask(event) {
  event.preventDefault();
  const input = document.getElementById("task-input");
  const text = input.value.trim();

  if (text === "") {
    return;
  }

  tasks.push({ text: text, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Clear completed tasks: keep only the unfinished ones, built with a loop.
function clearCompleted() {
  let kept = [];
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].done) {
      kept.push(tasks[i]);
    }
  }
  tasks = kept;
  saveTasks();
  renderTasks();
}

document.getElementById("task-form").addEventListener("submit", addTask);
document.getElementById("clear-done-btn").addEventListener("click", clearCompleted);

renderTasks();
