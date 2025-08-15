export function mobileViewToggle() {
	document.addEventListener("DOMContentLoaded", () => {
		const mobileLogo = document.querySelector(".logo-mobile");
		const sideBar = document.getElementById("side-bar-div");
		const overlay = document.getElementById("overlay");
        const mobileDarlLogo = document.getElementById('logoDark')

		mobileLogo.addEventListener("click", () => {
            mobileDarlLogo.style.display = ''
			// Toggle a class to hide/show the sidebar
			sideBar.classList.toggle("show-sidebar");
			overlay.classList.toggle("show-overlay");
		});
	});
}
