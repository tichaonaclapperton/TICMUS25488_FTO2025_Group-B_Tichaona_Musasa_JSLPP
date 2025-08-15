/**

 * @fileoverview Task management application.
 * This script handles creating, editing, and rendering tasks
 * with support for saving to and retrieving from localStorage.
 */

import { loadApiTasks } from "./apiData.js";
import { closeModal } from "./modal/closeModal.js";
import { sideBarToogle } from "./toogle/toogle.js";
import { mobileViewToggle } from "./mobile-toggle/mobileViewToogle.js";
import { appendTaskToContainer } from "./storage/storage.js";
import { getTasksFromLocalStorage } from "./storage/storage.js";
import { updateColumnHeaders } from "./update-columns/updateColumns.js";

function saveTasksToLocalStorage(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

export let tasks = getTasksFromLocalStorage();

export let selectedTask = null;

// *****getting DOM elements*******

/** @type {HTMLDivElement} */
const taskInput = document.getElementById("taskTitleInput");
/** @type {HTMLDivElement} */
const taskDiscriptionInput = document.getElementById("taskDescriptionInput");
/** @type {HTMLDivElement} */

/** @type {HTMLDivElement} */
const taskStatusInput = document.getElementById("taskStatusInput");

/** @type {HTMLDivElement} */

/** @type {HTMLDivElement} */
const deleteTaskBtn = document.getElementById("deleteTaskBtn");
const modal = document.getElementById("modal");
const saveTaskBtn = document.getElementById("saveTaskBtn");

/**
 * Opens the task modal for adding or editing a task.
 * @param {HTMLElement|null} taskElement - The clicked task element or null for new tasks.
 * @returns {void}
 */

export function openModal(taskElement) {
	const heading = document.getElementById("modal-heading");
	selectedTask = taskElement;
	if (taskElement) {
		taskInput.value = taskElement.textContent;
		taskDiscriptionInput.value = taskElement.dataset.description;
		taskStatusInput.value = taskElement.dataset.status;
		heading.textContent = "Edit Task";
		saveTaskBtn.textContent = "Save Changes";
		deleteTaskBtn.textContent = "Delete Task";
		deleteTaskBtn.style.display = "inline-flex";
		if (window.innerWidth <= 768) {
			saveTaskBtn.style.width = "100%";
			deleteTaskBtn.style.width = "100%";
			deleteTaskBtn.style.marginLeft = "0";
			deleteTaskBtn.style.marginTop = "15px";
			deleteTaskBtn.style.paddingLeft = "170px";
		} else {
			saveTaskBtn.style.width = "200px";
			deleteTaskBtn.style.width = "200px";
		}
	} else {
		taskInput.value = "";
		taskDiscriptionInput.value = "";
		taskStatusInput.value = "todo";
		heading.textContent = "Add New Task";
		saveTaskBtn.textContent = "Create Task";
		saveTaskBtn.style.width = "100%";
		deleteTaskBtn.style.display = "none";
	}

	modal.style.display = "flex";
}

export const renderTasks = (tasks) => {
	// 1 Clear all existing tasks
	document.querySelectorAll(".tasks-container").forEach((container) => {
		container.innerHTML = "";
	});

	// 2. Loop through and create task elements
	tasks.forEach((task) => {
		const taskDiv = document.createElement("div");
		taskDiv.className = "task-div";
		taskDiv.textContent = task.title;
		taskDiv.dataset.description = task.description;
		taskDiv.dataset.status = task.status;
		taskDiv.dataset.taskId = task.id;

		// 3. Append to correct container
		appendTaskToContainer(task, taskDiv);

		// 4. Enable click-to-edit modal
		taskDiv.addEventListener("click", function () {
			openModal(this);
		});
	});

	// 5. Update column headers with counts
	updateColumnHeaders(tasks);
};

const addTaskBtn = document.getElementById("addTaskBtn");
addTaskBtn.addEventListener("click", () => {
	openModal(null);
});

// openModal(taskElement);

/**
 * Retrieves tasks from localStorage.
 * @returns {Array<Object>} - The list of stored tasks or an empty array.
 */

/**
 * Saves tasks to localStorage.
 * @param {Array<Object>} tasks - The array of task objects to store.
 * @returns {void}
 */

export function saveTasks() {
	saveTasksToLocalStorage(tasks);
	renderTasks(tasks);
}

deleteTaskBtn.addEventListener("click", () => {
	const taskId = selectedTask.dataset.taskId;
	deletTaskFromLocalStorage(Number(taskId));
	modal.style.display = "none";
});

export function deletTaskFromLocalStorage(id) {
	tasks = tasks.filter((task) => task.id !== id);
	saveTasks();
	renderTasks(tasks);
}

/**
 * Handles saving a task when clicking the Save button.
 * Updates an existing task or adds a new one.
 */

saveTaskBtn.addEventListener("click", () => {
	const title = taskInput.value.trim();
	const description = taskDiscriptionInput.value.trim();
	const status = taskStatusInput.value;

	if (!title) {
		alert("Task title cannot be empty.");
		return;
	}

	// ****This  decides whether to edit an existing task or add a new one based on whether selectedTask exists. ******

	if (selectedTask) {
		// Edit existing task
		const oldTitle = selectedTask.textContent;
		const index = tasks.findIndex((t) => t.id === oldTitle);
		if (index !== -1) {
			// tasks[index] = { title, description, status };
			tasks[index] = { ...tasks[index], title, description, status };
		}
	} else {
		// Add new task

		tasks.push({ id: Date.now(), title, description, status });
	}
	renderTasks();
	saveTasks();
	

	modal.style.display = "none";
});

/**
 * Initializes the app after the DOM content is loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
	if (tasks.length === 0) {
		saveTasksToLocalStorage(tasks); // Optional fallback
	}
	renderTasks(getTasksFromLocalStorage());
});

function main() {
	closeModal();
	loadApiTasks();
	getTasksFromLocalStorage;
	sideBarToogle();
	mobileViewToggle();
}

main();
