import { tasks, saveTasks, getTasksFromLocalStorage } from "./script.js";

export async function fetchTasksFromAPI() {
	const apiURL = "https://jsl-kanban-api.vercel.app/";
	if (!apiURL) {
		throw new Error("API URL is not defined");
	}
	return fetchTasks(apiURL);
}

function mapApiDataToTasks(data) {
	const statuses = ["todo", "doing", "done"];
	return data.slice(0, 9).map((item, index) => ({
		id: Date.now() + index,
		title: item.title,
		description: "Fetched from API",
		status: statuses[index % 3],
	}));
}

function saveTasksToLocalStorage() {
	try {
		saveTasks();
		console.log("Tasks saved to local storage");
	} catch (error) {
		console.error("Error saving tasks to local storage:", error);
	}
}

function loadExistingTasks() {
	return getTasksFromLocalStorage();
}

export async function loadApiTasks() {
	const loadingMsg = document.getElementById("loading-message");
	try {
		const existingTasks = getTasksFromLocalStorage();
		if (existingTasks.length > 0) {
			loadExistingTasks();
			return;
		}

		// Show loading message
		loadingMsg.textContent = "Loading tasks...";
		loadingMsg.style.display = "block";
		const data = await fetchTasksFromAPI();
		const apiTasks = mapApiDataToTasks(data);
		const newTasks = filterExistingTasks(apiTasks);
		tasks.push(...newTasks);
		saveTasksToLocalStorage();
	} catch (error) {
		console.error("Error fetching tasks:", error);
	} finally {
		// Hide loading message
		try {
			loadingMsg.style.display = "none";
		} catch (error) {
			console.error("Error hiding loading message:", error);
		}
	}
}
