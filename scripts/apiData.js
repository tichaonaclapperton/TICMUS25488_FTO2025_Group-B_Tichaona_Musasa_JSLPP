import {tasks,saveTasks} from './script.js'

export async function loadApiTasks() {
    const apiURL = 'https://jsl-kanban-api.vercel.app/'; 
    const loadingMsg = document.getElementById("loading-message");

    try {
        // Show loading message
        loadingMsg.textContent = "Loading tasks...";
        loadingMsg.style.display = "block";

        const response = await fetch(apiURL);
        const data = await response.json();

        // Distribute tasks evenly across the 3 statuses
        const statuses = ["todo", "doing", "done"];

        const apiTasks = data.slice(0, 9).map((item, index) => ({
            id: Date.now() + index,
            title: item.title,
            description: "Fetched from API",
            status: statuses[index % 3] // rotate through todo → doing → done
        }));

        // Merge API tasks with existing tasks
        tasks = [...tasks, ...apiTasks];
        saveTasks();

    } catch (error) {
        console.error("Error fetching tasks:", error);
    } finally {
        // Hide loading message
        loadingMsg.style.display = "none";
    }
}