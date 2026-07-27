const g = "API_URL_PLACEHOLDER";

async function e() {
    const h = document.getElementById("a").value;
    const i = document.getElementById("b").value;
    const j = document.getElementById("c").value;
    const k = document.getElementById("d").value;
    
    const l = { id: h, name: i, email: j, course: k };
    
    const m = await fetch(g + "/student", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(l)
    });
    
    const n = await m.json();
    document.getElementById("f").innerText = JSON.stringify(n);
}