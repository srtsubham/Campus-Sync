const API_BASE_URL = "https://hgd7eyusfj.execute-api.ap-south-1.amazonaws.com/Prod";

async function loadStudents() {
    const tb = document.getElementById("tb");
    try {
        const response = await fetch(`${API_BASE_URL}/students`);
        const data = await response.json();
        tb.innerHTML = "";
        if(!data || data.length === 0) {
            tb.innerHTML = '<tr><td colspan="4" style="text-align:center;">No records found.</td></tr>';
            return;
        }
        data.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${item.id}</td><td>${item.name}</td><td>${item.email}</td><td>${item.course}</td>`;
            tb.appendChild(tr);
        });
    } catch (error) {
        tb.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#e74c3c;">Failed to load data.</td></tr>';
    }
}

window.onload = loadStudents;