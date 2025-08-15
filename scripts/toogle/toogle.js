export function sideBarToogle(){
    const toggle = document.getElementById("themeToggle");
const body = document.body;
const sidebar = document.getElementById("side-bar-div");
const hideSidebarBtn = document.getElementById("hideSidebar");
const darkLight = document.getElementById("logoDark");
const lightLogo = document.getElementById("logo");

toggle.addEventListener("change", () => {
	body.classList.toggle("dark-mode");
	if (body.classList.contains("dark-mode")) {
		darkLight.style.display = "block";
		lightLogo.style.display = "none";
	} else {
		darkLight.style.display = "none";
		lightLogo.style.display = "block";
	}
	renderTasks(tasks);
});

hideSidebarBtn.addEventListener("click", () => {
	sidebar.classList.toggle("hidden");
});
}