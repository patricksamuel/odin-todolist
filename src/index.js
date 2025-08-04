import "./styles.css";
import { format, isBefore, differenceInDays } from "date-fns";


console.log("index.js test");


const allTasks = [];
class Task {
    constructor(taskId,taskDesc, dueDate,doneStatus,createdDate, doneDate) {
        this.taskId = taskId;
        this.taskDesc = taskDesc;
        this.dueDate= dueDate;
        this.doneStatus = doneStatus;
        this.createdDate = format(new Date(), "yyyy-MM-dd");
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
function addTask(taskDesc, dueDate, doneStatus) {
    const taskId = crypto.randomUUID();
    const createdDate = format(new Date(), "yyyy-MM-dd");
    const doneDate = doneStatus ? createdDate : null;
    const newTask = new Task(taskId,taskDesc, dueDate, doneStatus,createdDate, doneDate);
    allTasks.push(newTask);
    console.log("task added");
}

function deleteTask(taskId) {
    const index = allTasks.findIndex((task) => task.taskId === taskId)
    if (index !== -1){
        allTasks.splice(index,1);
        console.log("element number"+taskId+" is deleted");
    }
    else {
        console.log("element number"+taskId+" does not exist");
    }

}

addTask("test task 1", "2025-08-06", false);
addTask("test task 2", "2025-08-03", true);

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
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        const editButton = document.createElement("button");
        editButton.textContent = "edit";
        

        deleteButton.addEventListener("click", (e) => {
            deleteTask(task.taskId);
            mainContainer.removeChild(li)
        });
        
        editButton.addEventListener("click", (e) => {
            deleteTask(task.taskId);
            mainContainer.removeChild(li)
        });

        li.textContent = `Task Id: ${task.taskId}. You have to do: ${task.taskDesc} by ${task.dueDate} And you did it on ${task.doneDate}`;
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



