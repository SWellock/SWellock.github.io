const monthNames = [
    "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December",
];

const body = document.querySelector("body")
const blogShowcase = document.querySelector("#blog-showcase")

init();

async function init() {
    let posts = []
    let lastKey = null;
    let currentItemGrid = null;
    try {
        const resource = await fetch("manifest.json");
        if (resource.ok) posts = await resource.json();
    } catch (err){
        console.error("Could not load manifest.json", err);
    }
    for (var i = 0; i < 1; i++){
        post = posts[i]
        const {year, month} = splitDate(post.date);
        const d = document.createElement("a");
        console.log(post.excerpt)
        d.innerHTML = `<h1> ${post.title} </h1><p> ${post.excerpt}</p><p> ${post.date}</p>`
        blogShowcase.appendChild(d)
    }
}

function splitDate(dateStr) {
    return { year: dateStr.slice(0, 4), month: dateStr.slice(5, 7) };
}
