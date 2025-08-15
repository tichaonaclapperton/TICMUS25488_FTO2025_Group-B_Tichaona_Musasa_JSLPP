export function closeModal(){
    const closeModalBtn = document.getElementById("close-modal");

/** @type {HTMLDivElement} */
const modal = document.getElementById("modal");
/**
 * Closes the modal when clicking the Close button.
 */

closeModalBtn.addEventListener("click", () => {
	modal.style.display = "none";
	selectedTask = null;
});

/**
 * Closes the modal when clicking outside it.
 * @param {MouseEvent} event
 */

window.addEventListener("click", function (event) {
	if (event.target === modal) {
		modal.style.display = "none";
	}
});
}


