
init();

async function init() {
    const central = document.querySelector(".central")
    let posts = []
    try {
        const resource = await fetch("manifest.json");
        if (resource.ok) posts = await resource.json();
    } catch (err){
        console.error("Could not load manifest.json", err);
    }
    for (const post of posts){
        const {year, month} = splitDate(post.date);
        const d = document.createElement("div");
        d.innerHTML = `<h1> ${post.title} </h1><p> ${post.excerpt}</p>`
        central.appendChild(d)
    }
}

function splitDate(dateStr) {
    return { year: dateStr.slice(0, 4), month: dateStr.slice(5, 7) };
}
