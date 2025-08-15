export function sideBarToogle(){
const toggle = document.getElementById("themeToggle");
const body = document.body;
const sidebar = document.getElementById("side-bar-div");
const hideSidebarBtn = document.getElementById("hideSidebar");
const darkLight = document.getElementById("logoDark");
const lightLogo = document.getElementById("logo");
const hideSwitch = document.getElementById("hideSwitch");

toggle.addEventListener("change", () => {
	body.classList.toggle("dark-mode");
	if (body.classList.contains("dark-mode")) {
		darkLight.style.display = "block";
		lightLogo.style.display = "none";
		hideSwitch.style.backgroundColor = 'rgba(99, 95, 199, 1)';
		hideSidebarBtn.style.backgroundColor = 'rgba(99, 95, 199, 1)';
		hideSidebarBtn.style.color= 'white';
	} else {
		darkLight.style.display = "none";
		lightLogo.style.display = "block";
		hideSwitch.style.backgroundColor = 'rgba(244, 247, 253, 1)';
		hideSidebarBtn.style.backgroundColor = 'rgba(244, 247, 253, 1)';
		hideSidebarBtn.style.color= 'rgba(99, 95, 199, 1)';
	}
	renderTasks(tasks);
});

hideSidebarBtn.addEventListener("click", () => {
	sidebar.classList.toggle("hidden");
});
}