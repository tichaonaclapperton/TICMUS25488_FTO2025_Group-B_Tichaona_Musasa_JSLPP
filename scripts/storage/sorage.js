// storage.js
export function getTasksFromLocalStorage() {
    try {
        const stored = localStorage.getItem("tasks");
        return stored ? JSON.parse(stored) : [];
    } catch (err) {
        console.error("Invalid localStorage data", err);
        localStorage.removeItem("tasks");
        return [];
    }
}

export function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
