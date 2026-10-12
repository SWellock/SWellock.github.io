const monthNames = [
    "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December",
];

const body = document.querySelector("body")


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
    for (const post of posts){
        const {year, month} = splitDate(post.date);
        const key = `${year}-${month}`;
        if (key !== lastKey){
            const dateHeader = document.createElement("h1")
            const itemGrid = document.createElement("div")
            itemGrid.classList.add("item-grid")
            dateHeader.innerHTML = `${monthNames[Number(month) - 1]} ${year} Blogs`
            dateHeader.classList.add("page-title")
            body.appendChild(dateHeader)
            body.appendChild(itemGrid)
            currentItemGrid = itemGrid
            lastKey = key
        }
        const item = document.createElement("a");
        item.href = post.path
        console.log(post.title)
        item.classList.add("item")
        item.innerHTML = `<h1> ${post.title} </h1><p> ${post.excerpt}</p>`
        currentItemGrid.appendChild(item)
    }
}

function splitDate(dateStr) {
    return { year: dateStr.slice(0, 4), month: dateStr.slice(5, 7) };
}
