type Task = {
    title: string
    completed: boolean
  }
  
  const list = document.querySelector<HTMLUListElement>("#list");
  const form = document.getElementById("new-task-form") as HTMLFormElement | null;
  const input = document.querySelector<HTMLInputElement>("#new-task-title");
  const clearButton = document.querySelector('#clearBtn')! as HTMLInputElement;
  const tasks: Task[] = loadTasks();
  tasks.forEach(addListItem);
  
  const deleteItem = () => {
    tasks.splice(0);
    saveTasks()
  }

  form?.addEventListener("submit", e => {
    e.preventDefault()
  
    if (input?.value == "" || input?.value == null) return
  
    const newTask: Task = {
      title: input.value,
      completed: false,
    }
    
    tasks.push(newTask)
    saveTasks()
    
  
    addListItem(newTask)
    input.value = ""
    location.reload();
  })
  
  function addListItem(task: Task) {
    const item: HTMLLIElement = document.createElement("li")
    const label: HTMLLabelElement = document.createElement("label")

    const checkbox: HTMLInputElement = document.createElement("input")
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked
      saveTasks()
    })
    checkbox.type = "checkbox"
    checkbox.checked = task.completed

    const deleteBtn: HTMLButtonElement = document.createElement("button");
    deleteBtn.innerHTML = `<span class="material-icons">
    close</span>`;

    deleteBtn.addEventListener("click", () => deleteItem());

    label.append(checkbox, task.title)
    item.append(label)
    list?.append(item)
  }
  
  function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks))
  }
  
  function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem("TASKS")
    if (taskJSON == null) return []
    return JSON.parse(taskJSON)
  }

  clearButton.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
  })