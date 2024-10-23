document.addEventListener('DOMContentLoaded', () => {
const taskButton = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");

// we always want to read local storage and update tasklist for website using local data.
let TaskList = JSON.parse(localStorage.getItem('keyforpushData_toLocal')) || []   // if no data locally then || sets array to empty...
TaskList.forEach(element => {
    rendertask(element)
});



// grab text when todoInput is pressed.
taskButton.addEventListener("click", () => {
    textGivenByUser = todoInput.value.trim()
    if(textGivenByUser === "") return;

    const DataToPush_toTasklist = {
        UID: Date.now(),
        content: textGivenByUser,
        TaskCompletedStatus: false,
    };

    TaskList.push(DataToPush_toTasklist)    
    todoInput.value = ""
    pushData_toLocal()
    rendertask(DataToPush_toTasklist)
    console.log(TaskList)
})

function rendertask(datatorender){
    const li = document.createElement('li');
    //basically setting up some identification for this const.
    li.setAttribute("list-UID", datatorender.UID)
    li.innerHTML = `<span>${datatorender.content}</span>
    <button>Delete</button>`
    todoList.append(li)

    // reverses the task completion status.
    li.addEventListener('click', (e) => {
        if(e.target.tagName === "BUTTON") return
        datatorender.TaskCompletedStatus = !datatorender.TaskCompletedStatus
        li.classList.toggle("completed") //toggling css class toggle.. which render strikethrough line...
        pushData_toLocal()
    })

    // delete events
    li.addEventListener('click', (e) => {
        e.stopPropagation() // stop bubbling
        TaskList = TaskList.filter(k => k.UID !== datatorender.UID)
        li.remove()
        pushData_toLocal()
    })
}

    // function to push data to local storage.
function pushData_toLocal() {
    localStorage.setItem("keyforpushData_toLocal", JSON.stringify(TaskList));
}


})