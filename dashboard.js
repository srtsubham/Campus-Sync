const nt = [
    { t: "CRITICAL: Semester 8 Final Project Submission Portal Open", l: "https://example.com/portal" },
    { t: "NOTICE: Technical Training Fee Clearance Mandatory Before Exams", l: "https://example.com/fees" }
];

function rnd() {
    let n = document.getElementById("ntf");
    n.innerHTML = "";
    nt.forEach(i => {
        let a = document.createElement("a");
        a.className = "blink";
        a.href = i.l;
        a.target = "_blank";
        a.innerText = "► " + i.t;
        n.appendChild(a);
    });
}

function getU() {
    let t = localStorage.getItem("tok");
    if (!t) {
        window.location.href = "index.html";
        return null;
    }
    let p = JSON.parse(atob(t.split('.')[1]));
    return p["cognito:username"] || p["sub"] || "Unknown";
}

function ld() {
    let u = getU();
    if (!u) return;
    document.getElementById("uid").innerText = u;

    let k = "erp" + u;
    let d = JSON.parse(localStorage.getItem(k)) || { mks: [], bks: [], tr: [], tc: [] };

    if (!Array.isArray(d.tr)) d.tr = [];
    if (d.tech) { d.tc = []; delete d.tech; }
    if (!Array.isArray(d.tc)) d.tc = [];
    
    if (d.bks.length > 0 && typeof d.bks[0] === 'string') {
        let nb = [];
        for (let i = 0; i < d.bks.length; i++) {
            nb.push({ n: d.bks[i], dt: "Legacy Entry" });
        }
        d.bks = nb;
        localStorage.setItem(k, JSON.stringify(d));
    }

    let ltr = d.tr.length > 0 ? d.tr[d.tr.length - 1].tot : 0;
    let ltc = d.tc.length > 0 ? d.tc[d.tc.length - 1].tot : 0;

    document.getElementById("stMks").innerText = "Subjects Logged: " + d.mks.length;
    document.getElementById("stBk").innerText = "Books Issued: " + d.bks.length;
    document.getElementById("stTr").innerText = "Transport Fee: INR " + ltr;
    document.getElementById("stTech").innerText = "Technical Fee: INR " + ltc;

    let tm = document.getElementById("tbMks");
    tm.innerHTML = "";
    if (d.mks.length === 0) {
        tm.innerHTML = '<tr><td colspan="3" style="text-align:center">No academic records.</td></tr>';
    } else {
        d.mks.forEach(i => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${i.sem}</td><td>${i.sub}</td><td>${i.mks}/100</td>`;
            tm.appendChild(tr);
        });
    }

    let tb = document.getElementById("tbBk");
    tb.innerHTML = "";
    if (d.bks.length === 0) {
        tb.innerHTML = '<tr><td colspan="3" style="text-align:center">No books issued.</td></tr>';
    } else {
        d.bks.forEach(i => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${i.n}</td><td>${i.dt}</td><td>Issued</td>`;
            tb.appendChild(tr);
        });
    }

    let tt = document.getElementById("tbTr");
    tt.innerHTML = "";
    if (d.tr.length === 0) {
        tt.innerHTML = '<tr><td colspan="3" style="text-align:center">No transport fee records.</td></tr>';
    } else {
        d.tr.forEach(i => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>INR ${i.amt}</td><td>INR ${i.tot}</td><td>${i.dt}</td>`;
            tt.appendChild(tr);
        });
    }

    let tc = document.getElementById("tbTc");
    tc.innerHTML = "";
    if (d.tc.length === 0) {
        tc.innerHTML = '<tr><td colspan="3" style="text-align:center">No technical fee records.</td></tr>';
    } else {
        d.tc.forEach(i => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>INR ${i.amt}</td><td>INR ${i.tot}</td><td>${i.dt}</td>`;
            tc.appendChild(tr);
        });
    }
}

function addM() {
    let u = getU();
    if (!u) return;
    let s = document.getElementById("sem").value;
    let sb = document.getElementById("sub").value;
    let m = document.getElementById("mks").value;

    if (!sb || !m) return;

    let k = "erp" + u;
    let d = JSON.parse(localStorage.getItem(k)) || { mks: [], bks: [], tr: [], tc: [] };

    d.mks.push({ sem: s, sub: sb, mks: m });
    localStorage.setItem(k, JSON.stringify(d));

    document.getElementById("sub").value = "";
    document.getElementById("mks").value = "";
    ld();
}

function addB() {
    let u = getU();
    if (!u) return;
    let b = document.getElementById("bk").value;
    if (!b) return;

    let k = "erp" + u;
    let d = JSON.parse(localStorage.getItem(k)) || { mks: [], bks: [], tr: [], tc: [] };

    let dt = new Date().toLocaleString();
    d.bks.push({ n: b, dt: dt });
    localStorage.setItem(k, JSON.stringify(d));

    document.getElementById("bk").value = "";
    ld();
}

function addTr() {
    let u = getU();
    if (!u) return;
    let a = parseFloat(document.getElementById("tr").value);
    if (isNaN(a) || a <= 0) return;

    let k = "erp" + u;
    let d = JSON.parse(localStorage.getItem(k)) || { mks: [], bks: [], tr: [], tc: [] };

    let lt = d.tr.length > 0 ? d.tr[d.tr.length - 1].tot : 0;
    let nt = lt + a;
    let dt = new Date().toLocaleString();

    d.tr.push({ amt: a, tot: nt, dt: dt });
    localStorage.setItem(k, JSON.stringify(d));

    document.getElementById("tr").value = "";
    ld();
}

function addTc() {
    let u = getU();
    if (!u) return;
    let a = parseFloat(document.getElementById("tc").value);
    if (isNaN(a) || a <= 0) return;

    let k = "erp" + u;
    let d = JSON.parse(localStorage.getItem(k)) || { mks: [], bks: [], tr: [], tc: [] };

    let lt = d.tc.length > 0 ? d.tc[d.tc.length - 1].tot : 0;
    let nt = lt + a;
    let dt = new Date().toLocaleString();

    d.tc.push({ amt: a, tot: nt, dt: dt });
    localStorage.setItem(k, JSON.stringify(d));

    document.getElementById("tc").value = "";
    ld();
}

window.onload = function() {
    rnd();
    ld();
};