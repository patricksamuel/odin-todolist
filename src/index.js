import "./styles.css";
import { format, isBefore, differenceInDays } from "date-fns";


console.log("index.js test 3");


//Task class definition
class Task {
    constructor(taskId,taskDesc, dueDate,doneStatus,createdDate, doneDate) {
        this.taskId = taskId;
        this.taskDesc = taskDesc;
        this.dueDate= dueDate;
        this.doneStatus = doneStatus;
        this.createdDate = createdDate;
        this.doneDate = doneDate;
        }
    taskInfo(){
        if (this.doneStatus) {
            console.log("Task Id:" +this.taskId+". You have to do: "+this.taskDesc+" by "+this.dueDate+" And you did it on "+this.doneDate);
            }
        else {
            console.log("Task Id:" +this.taskId+". You have to do: "+this.taskDesc+" by "+this.dueDate+" not done yet");
            }
        }
    }


function storageAvailable(type) {
    let storage;
    try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
    } catch (e) {
    return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
    );
    }
}
// function to store task object locally
function saveAllTasksLocal(allTasks) {
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
}

// reload local taks storage
function loadAllTasks() {
  const raw = JSON.parse(localStorage.getItem("allTasks")) || [];
  return raw.map(task => new Task(task.taskId,task.taskDesc, task.dueDate, task.doneStatus,task.createdDate, task.doneDate))
}


let allTasks = [];

 if (storageAvailable("localStorage")) {
  allTasks = loadAllTasks();
} 
else {
  saveAllTasksLocal(allTasks);
} 

/* allTasks = loadAllTasks();
 */


if (allTasks.length === 0) {
  addTask("test task 1", "2025-08-06", false);
  addTask("test task 2", "2025-08-03", true);
}



function editTask(taskId,taskDesc, dueDate, doneStatus) {
    const index = allTasks.findIndex((task) => task.taskId === taskId)
    const taskToEdit = allTasks[index]
    taskToEdit.taskDesc = taskDesc;
    taskToEdit.dueDate = dueDate;
    console.log("task edited");
    saveAllTasksLocal(allTasks);
}


function addTask(taskDesc, dueDate, doneStatus) {
    const taskId = crypto.randomUUID();
    const createdDate = format(new Date(), "yyyy-MM-dd");
    const doneDate = doneStatus ? createdDate : null;
    const newTask = new Task(taskId,taskDesc, dueDate, doneStatus,createdDate, doneDate);
    allTasks.push(newTask);
    console.log("task added");
    saveAllTasksLocal(allTasks);
}

function deleteTask(taskId) {
    const index = allTasks.findIndex((task) => task.taskId === taskId)
    if (index !== -1){
        allTasks.splice(index,1);

        console.log("element number"+taskId+" is deleted");
        saveAllTasksLocal(allTasks);
    }
    else {
        console.log("element number"+taskId+" does not exist");
    }

}

const editForm = document.createElement("Div") // create edit container
// edit task input
const EditTaskDescLabel = document.createElement("label");
EditTaskDescLabel.textContent = "Task Description"
const EditTaskDescInput = document.createElement("input");

// Save Button to edit
const saveEditButton = document.createElement("button");
editForm.appendChild(EditTaskDescLabel);
editForm.appendChild(EditTaskDescInput);
editForm.appendChild(saveEditButton);
saveEditButton.textContent = "Save";


//show all task on console
function showAllTasksConsole() {
    allTasks.forEach((task) => task.taskInfo());
}
window.showAllTasksConsole = showAllTasksConsole;
window.addTask = addTask;
window.deleteTask = deleteTask;

function showAllTasksDom(){
    const mainContainer = document.querySelector("#maincontainer");
    mainContainer.textContent = '';
    allTasks.forEach(task => {
        const li = document.createElement("li");
        // check done button
        const doneButton = document.createElement("input");
        doneButton.type = "checkbox";
        doneButton.checked=task.doneStatus;
        doneButton.addEventListener("click", (e) => {
            task.doneStatus = doneButton.checked;
            task.doneDate = doneButton.checked ? format(new Date(), "yyyy-MM-dd") : null;
            saveAllTasksLocal(allTasks);
            showAllTasksDom();
            //li.innerHTML = "";
            //li.textContent = `Task Id: ${task.taskId}. You have to do: ${task.taskDesc} by ${task.dueDate} And you did it on ${task.doneDate}`;
            //if (task.doneStatus === true){
            //    li.style.textDecoration = "line-through";
            //}
            //li.appendChild(deleteButton);
            //li.appendChild(editButton);
        });
        // delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.addEventListener("click", (e) => {
            deleteTask(task.taskId);
            saveAllTasksLocal(allTasks);
            mainContainer.removeChild(li)
        });
        //Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "edit";
        editButton.addEventListener("click", (e) => {
            console.log("want to edit");
            EditTaskDescInput.value = task.taskDesc;
            
            li.appendChild(editForm);
            saveEditButton.addEventListener("click",(e)=>{
                editTask(task.taskId,EditTaskDescInput.value, task.dueDate, task.doneStatus);
                saveAllTasksLocal(allTasks);
                showAllTasksDom();
            })

            
        });
        
        li.textContent = `Task Id: ${task.taskId}. You have to do: ${task.taskDesc} by ${task.dueDate} And you did it on ${task.doneDate}`;
        if (task.doneStatus === true){
            li.style.textDecoration = "line-through";
        }
        li.appendChild(doneButton);
        li.appendChild(deleteButton);
        li.appendChild(editButton);
        mainContainer.appendChild(li);
    });
}

const newTaskButton = document.querySelector("#newTaskButton");
const taskField = document.querySelector("#taskField");
const dueDateField = document.querySelector("#dueDateField");
const doneField = document.querySelector("#doneField");



newTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    addTask(taskField.value, dueDateField.value, doneField.checked);
    showAllTasksDom();
    }
)

showAllTasksDom();



