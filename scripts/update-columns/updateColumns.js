/**
 * Update the header text for each status column with task count.
 * @param {Array<Object>} tasks - List of all tasks.
 */

export const updateColumnHeaders = (tasks) => {
	const statuses = ["todo", "doing", "done"];
	statuses.forEach((status) => {
		const count = tasks.filter((task) => task.status === status).length;
		document.getElementById(
			`${status}Text`
		).textContent = `${status.toUpperCase()} (${count})`;
	});
};
