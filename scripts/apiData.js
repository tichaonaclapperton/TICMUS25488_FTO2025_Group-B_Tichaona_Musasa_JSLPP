import { tasks, saveTasks } from "./script.js";

export async function loadApiTasks() {
	const apiURL = "https://jsl-kanban-api.vercel.app/";
	const loadingMsg = document.getElementById("loading-message");

	try {
		// Show loading message
		loadingMsg.textContent = "Loading tasks...";
		loadingMsg.style.display = "block";

		if (!apiURL) {
			throw new error("api url is not defined");
		}

		const response = await fetch(apiURL);
		const data = await response.json();

		// Distribute tasks evenly across the 3 statuses
		const statuses = ["todo", "doing", "done"];

		const apiTasks = data.slice(0, 9).map((item, index) => ({
			id: Date.now() + index,
			title: item.title,
			description: "Fetched from API",
			status: statuses[index % 3], // rotate through todo → doing → done
		}));

		// Check for existing tasks in local storage
		const existingTasks = getTasksFromLocalStorage();
		const existingTaskIds = existingTasks.map((task) => task.id);

		// Filter out tasks that already exist in local storage
		const newTasks = apiTasks.filter(
			(task) => !existingTaskIds.includes(task.id)
		);

		tasks.push(...newTasks);
		try {
			// Save tasks to local storage
			saveTasks();
			console.log("Tasks saved to local storage");
		} catch (error) {
			console.error("Error saving tasks to local storage:", error);
		}
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
