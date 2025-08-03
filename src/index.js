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
            console.log("You have to do: "+this.taskDesc+" by "+this.dueDate+" And you did it on "+this.doneDate);
            }
        else {
            console.log("You have to do: "+this.taskDesc+" by "+this.dueDate+" not done yet");
            }
        }
    }
function addTask(taskDesc, dueDate, doneStatus) {
    const taskId = crypto.randomUUID();
    const createdDate = format(new Date(), "yyyy-MM-dd");
    const doneDate = doneStatus ? createdDate : null;
    const newTask = new Task(taskId,taskDesc, dueDate, doneStatus,createdDate, doneDate);
    allTasks.push(newTask);
}

addTask("test task 1", "2025-08-06", false);
addTask("test task 2", "2025-08-03", true);

allTasks.forEach((task) => task.taskInfo());