const notices = [
    { text: "CRITICAL: Semester 8 Final Project Submission Portal Open", url: "https://example.com/portal" },
    { text: "NOTICE: Technical Training Fee Clearance Mandatory Before Exams", url: "https://example.com/fees" }
];

function renderNotices() {
    let n = document.getElementById("ntf");
    n.innerHTML = "";
    notices.forEach(i => {
        let a = document.createElement("a");
        a.className = "blink";
        a.href = i.url;
        a.target = "_blank";
        a.innerText = "► " + i.text;
        n.appendChild(a);
    });
}

function getUser() {
    let t = localStorage.getItem("tok");
    if (!t) {
        window.location.href = "index.html";
        return null;
    }
    let p = JSON.parse(atob(t.split('.')[1]));
    return p["cognito:username"] || p["sub"] || "Unknown";
}

function loadUserData() {
    let u = getUser();
    if (!u) return;
    document.getElementById("uid").innerText = u;

    let k = "erp_" + u;
    let d = JSON.parse(localStorage.getItem(k)) || { mks: [], bks: [], tr: 0, tech: 0 };

    document.getElementById("stMks").innerText = "Subjects Logged: " + d.mks.length;
    document.getElementById("stBk").innerText = "Books Issued: " + d.bks.length;
    document.getElementById("stTr").innerText = "Transport Fee: " + (d.tr > 0 ? "INR " + d.tr : "N/A");
    document.getElementById("stTech").innerText = "Technical Fee: " + (d.tech > 0 ? "INR " + d.tech : "N/A");

    let tbM = document.getElementById("tbMks");
    tbM.innerHTML = "";
    if (d.mks.length === 0) {
        tbM.innerHTML = '<tr><td colspan="3" style="text-align:center">No academic records found.</td></tr>';
    } else {
        d.mks.forEach(i => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${i.sem}</td><td>${i.sub}</td><td>${i.mks}/100</td>`;
            tbM.appendChild(tr);
        });
    }

    let tbB = document.getElementById("tbBk");
    tbB.innerHTML = "";
    if (d.bks.length === 0) {
        tbB.innerHTML = '<tr><td colspan="2" style="text-align:center">No books issued.</td></tr>';
    } else {
        d.bks.forEach(i => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${i}</td><td>Issued</td>`;
            tbB.appendChild(tr);
        });
    }
}

function addMarks() {
    let u = getUser();
    if (!u) return;
    let s = document.getElementById("sem").value;
    let sb = document.getElementById("sub").value;
    let m = document.getElementById("mks").value;

    if (!sb || !m) return;

    let k = "erp_" + u;
    let d = JSON.parse(localStorage.getItem(k)) || { mks: [], bks: [], tr: 0, tech: 0 };

    d.mks.push({ sem: s, sub: sb, mks: m });
    localStorage.setItem(k, JSON.stringify(d));

    document.getElementById("sub").value = "";
    document.getElementById("mks").value = "";

    loadUserData();
}

function addAdminData() {
    let u = getUser();
    if (!u) return;
    let b = document.getElementById("bk").value;
    let tr = document.getElementById("trFee").value;
    let te = document.getElementById("techFee").value;

    let k = "erp_" + u;
    let d = JSON.parse(localStorage.getItem(k)) || { mks: [], bks: [], tr: 0, tech: 0 };

    if (b) d.bks.push(b);
    if (tr) d.tr = tr;
    if (te) d.tech = te;

    localStorage.setItem(k, JSON.stringify(d));

    document.getElementById("bk").value = "";
    document.getElementById("trFee").value = "";
    document.getElementById("techFee").value = "";

    loadUserData();
}

window.onload = function() {
    renderNotices();
    loadUserData();
};