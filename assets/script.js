const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December",
];

const yearSelect = document.getElementById("year-select");
const monthSelect = document.getElementById("month-select");
const monthJump = document.getElementById("month-jump");
const postList = document.getElementById("post-list");
const emptyState = document.getElementById("empty-state");
const periodHeading = document.getElementById("period-heading");
const periodCount = document.getElementById("period-count");

init();

async function init() {
    let posts = []
    try {
        const resource = await fetch("manifest.json");
        if (resource.ok) posts = await resource.json();
    } catch (err){
        console.error("Could not load manifest.json", err);
    }
}
