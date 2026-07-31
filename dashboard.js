async function req(ep, m, dat) {
    let t = localStorage.getItem("tok");
    if (!t) {
        window.location.href = "index.html";
        return;
    }
    
    let opt = {
        method: m,
        headers: {
            "Content-Type": "application/json",
            "Authorization": t
        }
    };
    
    if (dat) opt.body = JSON.stringify(dat);
    
    let r = await fetch(b + ep, opt);
    return r.json();
}

async function load() {
    let t = document.getElementById("tb");
    try {
        let d = await req("/students", "GET", null);
        t.innerHTML = "";
        if (!d || d.length === 0) {
            t.innerHTML = '<tr><td colspan="4" style="text-align:center;">No records.</td></tr>';
            return;
        }
        d.forEach(i => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${i.id}</td><td>${i.name}</td><td>${i.email}</td><td>${i.course}</td>`;
            t.appendChild(tr);
        });
    } catch (e) {
        t.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#e74c3c;">Failed.</td></tr>';
    }
}

async function post() {
    let id = document.getElementById("si").value;
    let n = document.getElementById("sn").value;
    let e = document.getElementById("se").value;
    let c = document.getElementById("sc").value;
    
    if (!id || !n || !e || !c) return;
    
    let j = { id: id, name: n, email: e, course: c };
    
    try {
        let r = await req("/student", "POST", j);
        document.getElementById("msg").innerText = "Success";
        setTimeout(() => document.getElementById("msg").innerText = "", 3000);
        load();
    } catch (err) {
        document.getElementById("msg").innerText = "Error";
    }
}

if (window.location.pathname.includes("dashboard")) {
    window.onload = load;
}