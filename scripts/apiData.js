// apiData.js
export async function loadApiTasks() {
    const apiURL = 'https://jsl-kanban-api.vercel.app/';
    const loadingMsg = document.getElementById("loading-message");

    try {
        // Show loading
        if (loadingMsg) {
            loadingMsg.textContent = "Loading tasks...";
            loadingMsg.style.display = "block";
        }

        const response = await fetch(apiURL);
        const data = await response.json();

        const statuses = ["todo", "doing", "done"];

        const apiTasks = data.slice(0, 9).map((item, index) => ({
            id: Date.now() + index,
            title: item.title,
            description: "Fetched from API",
            status: statuses[index % 3]
        }));

        // // Merge API tasks into existing
        // tasks.push(...apiTasks);
        // saveTasks();

    } catch (error) {
        console.error("Error fetching tasks:", error);
    } finally {
        if (loadingMsg) loadingMsg.style.display = "none";
    }
}
