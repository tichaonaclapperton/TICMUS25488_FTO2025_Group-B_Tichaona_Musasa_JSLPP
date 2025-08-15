import { tasks, saveTasks, renderTasks } from "./main.js";
import { getTasksFromLocalStorage } from "./storage/storage.js";

async function fetchTasksFromAPI() {
    const apiURL = "https://jsl-kanban-api.vercel.app/";
    try {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log("API response:", data);
        return data;
    } catch (error) {
        console.error("Error fetching tasks from API:", error);
        return null;
    }
}

function mapApiDataToTasks(data) {
    let tasksArray = Array.isArray(data) ? data : data?.tasks;

    if (!Array.isArray(tasksArray)) {
        console.error("Invalid API response:", data);
        return [];
    }

    const statuses = ["todo", "doing", "done"];
    const mappedTasks = tasksArray.slice(0, 9).map((item, index) => ({
        id: Date.now() + index,
        title: item.title,
        description: "Fetched from API",
        status: statuses[index % 3],
    }));

    console.log("Mapped API tasks:", mappedTasks);
    return mappedTasks;
}

function filterExistingTasks(apiTasks, existingTasks) {
    return apiTasks.filter(apiTask => 
        !existingTasks.some(existing => existing.title === apiTask.title)
    );
}

export async function loadApiTasks() {
    const loadingMsg = document.getElementById("loading-message");

    try {
        const existingTasks = getTasksFromLocalStorage();

        if (existingTasks.length > 0) {
            console.log("Using existing local tasks");
            renderTasks(existingTasks);
            
        }

        if (loadingMsg) {
            loadingMsg.textContent = "Loading tasks...";
            loadingMsg.style.display = "block";
        }

        const data = await fetchTasksFromAPI();
        if (!data) {
            console.error("Failed to load tasks from API");
            return;
        }

        const apiTasks = mapApiDataToTasks(data);
        const newTasks = filterExistingTasks(apiTasks, existingTasks);

        tasks.push(...newTasks);
        renderTasks(tasks);
        saveTasks();
        
    } catch (error) {
        console.error("Error in loadApiTasks:", error);
    } finally {
        if (loadingMsg) loadingMsg.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", loadApiTasks);
