let gl = document.getElementById("cGlow");

document.addEventListener("mousemove", e => {
    if (gl) {
        gl.style.left = e.clientX + "px";
        gl.style.top = e.clientY + "px";
    }

    let le = document.getElementById("lEyeL");
    let re = document.getElementById("lEyeR");
    if (le && re && !document.getElementById("svgLock").classList.contains("lckd")) {
        let rc = document.getElementById("svgLock").getBoundingClientRect();
        let cx = rc.left + rc.width / 2;
        let cy = rc.top + rc.height / 2;
        let an = Math.atan2(e.clientY - cy, e.clientX - cx);
        let ox = Math.cos(an) * 5;
        let oy = Math.sin(an) * 5;
        le.setAttribute("cx", 30 + ox);
        le.setAttribute("cy", 65 + oy);
        re.setAttribute("cx", 70 + ox);
        re.setAttribute("cy", 65 + oy);
    }

    document.querySelectorAll(".mLck").forEach(lck => {
        let mle = lck.querySelector(".mEyeL");
        let mre = lck.querySelector(".mEyeR");
        let mrc = lck.getBoundingClientRect();
        let mcx = mrc.left + mrc.width / 2;
        let mcy = mrc.top + mrc.height / 2;
        let man = Math.atan2(e.clientY - mcy, e.clientX - mcx);
        let mox = Math.cos(man) * 4;
        let moy = Math.sin(man) * 4;
        if(mle && mre && !lck.classList.contains("lckd")) {
            mle.setAttribute("cx", 30 + mox);
            mle.setAttribute("cy", 65 + moy);
            mre.setAttribute("cx", 70 + mox);
            mre.setAttribute("cy", 65 + moy);
        }
    });

    let btn = document.querySelector('.syncBtn');
    if (btn) {
        let br = btn.getBoundingClientRect();
        let bx = br.left + br.width / 2;
        let by = br.top + br.height / 2;
        let ang = Math.atan2(e.clientX - bx, by - e.clientY) * (180 / Math.PI);
        btn.style.setProperty('--wave-deg', ang + 'deg');
    }
});

document.addEventListener("mousedown", () => {
    let lh = document.getElementById("lTeeth");
    let lm = document.getElementById("lMouth");
    let le = document.getElementById("lEyeL");
    let re = document.getElementById("lEyeR");
    if(lh && lm && le && re && !document.getElementById("svgLock").classList.contains("lckd")) {
        lh.style.opacity = "1";
        lm.setAttribute("d", "M 30 85 Q 50 110 70 85");
        le.setAttribute("ry", "7");
        re.setAttribute("ry", "7");
    }

    document.querySelectorAll(".mLck").forEach(lck => {
        let mlm = lck.querySelector(".mMouth");
        let mle = lck.querySelector(".mEyeL");
        let mre = lck.querySelector(".mEyeR");
        if(mlm && mle && mre && !lck.classList.contains("lckd")) {
            mlm.setAttribute("d", "M 30 85 Q 50 110 70 85");
            mle.setAttribute("ry", "7");
            mre.setAttribute("ry", "7");
        }
    });
});

document.addEventListener("mouseup", () => {
    let lh = document.getElementById("lTeeth");
    let lm = document.getElementById("lMouth");
    let le = document.getElementById("lEyeL");
    let re = document.getElementById("lEyeR");
    if(lh && lm && le && re && !document.getElementById("svgLock").classList.contains("lckd")) {
        lh.style.opacity = "0";
        lm.setAttribute("d", "M 30 88 Q 50 105 70 88");
        le.setAttribute("ry", "5");
        re.setAttribute("ry", "5");
    }

    document.querySelectorAll(".mLck").forEach(lck => {
        let mlm = lck.querySelector(".mMouth");
        let mle = lck.querySelector(".mEyeL");
        let mre = lck.querySelector(".mEyeR");
        if(mlm && mle && mre && !lck.classList.contains("lckd")) {
            mlm.setAttribute("d", "M 30 88 Q 50 105 70 88");
            mle.setAttribute("ry", "5");
            mre.setAttribute("ry", "5");
        }
    });
});

function ts() { document.getElementById("nb").classList.toggle("sh"); }

function cp() {
    let pt = document.getElementById("pdt");
    let lo = document.getElementById("loBtn");
    
    if(pt) {
        if(localStorage.getItem("tok")) {
            pt.className = "pdot grn";
            if(lo) lo.style.display = "block";
            
            let f = document.getElementById("lFace");
            let s = document.getElementById("lShack");
            let b = document.getElementById("lBody");
            let l = document.getElementById("svgLock");
            
            if(f) f.style.opacity = "0";
            if(s) {
                s.setAttribute("d", "M 30 50 V 30 A 20 20 0 0 1 70 30 V 50");
                s.setAttribute("stroke", "#00C851");
            }
            if(b) {
                b.setAttribute("fill", "#00C851");
                b.setAttribute("stroke", "#00C851");
            }
            if(l) {
                l.classList.add("lckd");
                l.style.filter = "drop-shadow(0 0 30px rgba(0,200,81,0.6))";
            }

            document.querySelectorAll(".mLck").forEach(lck => {
                let ms = lck.querySelector(".mShack");
                let mb = lck.querySelector(".mBody");
                if(ms) {
                    ms.setAttribute("d", "M 30 50 V 30 A 20 20 0 0 1 70 30 V 50");
                    ms.setAttribute("stroke", "#00C851");
                }
                if(mb) {
                    mb.setAttribute("fill", "#00C851");
                    mb.setAttribute("stroke", "#00C851");
                }
                lck.classList.add("lckd");
                lck.style.filter = "drop-shadow(0 0 15px rgba(0,200,81,0.4))";
            });

        } else {
            pt.className = "pdot red";
            if(lo) lo.style.display = "none";
        }
    }
}

let obs = new IntersectionObserver((es) => {
    es.forEach(e => {
        if(e.isIntersecting) {
            e.target.classList.add('vis');
            obs.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.pcard').forEach(p => {
    obs.observe(p);
    p.addEventListener('mousemove', e => {
        let r = p.getBoundingClientRect();
        let x = e.clientX - r.left - r.width / 2;
        let y = e.clientY - r.top - r.height / 2;
        p.style.transform = `perspective(1000px) rotateY(${x / 20}deg) rotateX(${-y / 20}deg) translateY(-5px)`;
        p.style.boxShadow = `0 20px 40px rgba(230,126,34,0.2)`;
        p.style.zIndex = 10;
    });
    p.addEventListener('mouseleave', () => {
        p.style.transform = `perspective(1000px) rotateY(0) rotateX(0) translateY(0)`;
        p.style.boxShadow = `0 10px 30px rgba(0,0,0,0.5)`;
        p.style.zIndex = 1;
    });
});

const bd = [
    { t: "Node Alpha", d: "Metrics Active and routing optimal.", i: "IMG_A_NULL" },
    { t: "Node Beta", d: "Database synchronized natively.", i: "IMG_B_NULL" },
    { t: "Node Gamma", d: "API connections stable.", i: "IMG_C_NULL" },
    { t: "Node Delta", d: "Cache optimization complete.", i: "IMG_D_NULL" },
    { t: "Node Epsilon", d: "Auth secured properly.", i: "IMG_E_NULL" },
    { t: "Node Zeta", d: "Routing layers clear.", i: "IMG_F_NULL" },
    { t: "Node Eta", d: "Logs verified completely.", i: "IMG_G_NULL" }
];
let bI = 0;

function rdB() {
    let fb = document.getElementById("fbn");
    if(!fb) return;
    fb.style.opacity = 0;
    setTimeout(() => {
        document.getElementById("fbH").innerText = bd[bI].t;
        document.getElementById("fbP").innerText = bd[bI].d;
        document.getElementById("fbI").innerText = bd[bI].i;
        fb.style.opacity = 1;
    }, 400);
}

function nxtB() { bI = (bI + 1) % bd.length; rdB(); }
function prvB() { bI = (bI - 1 + bd.length) % bd.length; rdB(); }

let aSld = setInterval(nxtB, 5000);
let bwp = document.querySelector('.fbnnrWrap');
if(bwp) {
    bwp.addEventListener('mouseenter', () => clearInterval(aSld));
    bwp.addEventListener('mouseleave', () => aSld = setInterval(nxtB, 5000));
}

const p = "ap-south-1_t98NCsCga";
const c = "5jvj3v12i36l2dfkm4odtln9v0";

let d = { UserPoolId: p, ClientId: c };
let up = new AmazonCognitoIdentity.CognitoUserPool(d);

function tog(v) {
    let lf = document.getElementById("lf");
    let rf = document.getElementById("rf");
    if(!lf || !rf) return;
    if (v === 1) {
        lf.style.display = "none";
        rf.style.display = "block";
    } else {
        lf.style.display = "block";
        rf.style.display = "none";
    }
}

function login() {
    let u = document.getElementById("u").value;
    let pw = document.getElementById("p").value;

    let ad = new AmazonCognitoIdentity.AuthenticationDetails({ Username: u, Password: pw });
    let cu = new AmazonCognitoIdentity.CognitoUser({ Username: u, Pool: up });
    
    cu.setAuthenticationFlowType('USER_PASSWORD_AUTH');
    
    document.body.classList.add("authAnimating");
    let lock = document.getElementById("svgLock");
    let face = document.getElementById("lFace");
    let shack = document.getElementById("lShack");
    let body = document.getElementById("lBody");

    setTimeout(() => {
        if(shack) {
            shack.setAttribute("d", "M 30 50 V 30 A 20 20 0 0 1 70 30 V 50");
            shack.setAttribute("stroke", "#00C851");
        }
        if(face) face.style.opacity = "0";
        if(body) {
            body.setAttribute("fill", "#00C851");
            body.setAttribute("stroke", "#00C851");
        }
        if(lock) {
            lock.classList.add("lckd");
            lock.style.filter = "drop-shadow(0 0 30px rgba(0,200,81,0.6))";
        }

        document.querySelectorAll(".mLck").forEach(lck => {
            let ms = lck.querySelector(".mShack");
            let mb = lck.querySelector(".mBody");
            if(ms) {
                ms.setAttribute("d", "M 30 50 V 30 A 20 20 0 0 1 70 30 V 50");
                ms.setAttribute("stroke", "#00C851");
            }
            if(mb) {
                mb.setAttribute("fill", "#00C851");
                mb.setAttribute("stroke", "#00C851");
            }
            lck.classList.add("lckd");
            lck.style.filter = "drop-shadow(0 0 15px rgba(0,200,81,0.4))";
        });

        cu.authenticateUser(ad, {
            onSuccess: function(res) {
                localStorage.setItem("tok", res.getIdToken().getJwtToken());
                setTimeout(() => { window.location.href = "dashboard.html"; }, 1000);
            },
            onFailure: function(err) {
                setTimeout(() => {
                    document.body.classList.remove("authAnimating");
                    if(shack) {
                        shack.setAttribute("d", "M 30 50 V 30 A 20 20 0 0 1 70 30 V 40");
                        shack.setAttribute("stroke", "#fff");
                    }
                    if(face) face.style.opacity = "1";
                    if(body) {
                        body.setAttribute("fill", "#050201");
                        body.setAttribute("stroke", "#fff");
                    }
                    if(lock) {
                        lock.classList.remove("lckd");
                        lock.style.filter = "drop-shadow(0 0 20px rgba(255,255,255,0.4))";
                    }

                    document.querySelectorAll(".mLck").forEach(lck => {
                        let ms = lck.querySelector(".mShack");
                        let mb = lck.querySelector(".mBody");
                        if(ms) {
                            ms.setAttribute("d", "M 30 50 V 30 A 20 20 0 0 1 70 30 V 40");
                            ms.setAttribute("stroke", "#fff");
                        }
                        if(mb) {
                            mb.setAttribute("fill", "#050201");
                            mb.setAttribute("stroke", "#fff");
                        }
                        lck.classList.remove("lckd");
                        lck.style.filter = "drop-shadow(0 0 8px rgba(255,255,255,0.3))";
                    });

                    alert(err.message || JSON.stringify(err));
                }, 1000);
            }
        });
    }, 800);
}

function register() {
    let ru = document.getElementById("ru").value;
    let re = document.getElementById("re").value;
    let rp = document.getElementById("rp").value;
    
    let al = [];
    let ea = { Name: "email", Value: re };
    let aa = new AmazonCognitoIdentity.CognitoUserAttribute(ea);
    al.push(aa);
    
    up.signUp(ru, rp, al, null, function(err, res) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        alert("Record created successfully. Return to access to authenticate.");
        tog(0);
    });
}

function logOut() {
    localStorage.removeItem("tok");
    window.location.href = "index.html";
}

function sbK() {
    let iv = document.getElementById("hsbi").value.toLowerCase();
    let sg = document.getElementById("sbg");
    if(iv.length > 0) {
        sg.style.display = "flex";
        sg.innerHTML = `
            <div onclick="location.href='index.html'">Dashboard / Home - ${iv}</div>
            <div onclick="location.href='analytics.html'">System Metrics - ${iv}</div>
            <div onclick="location.href='contact.html'">Support - ${iv}</div>
        `;
    } else {
        sg.style.display = "none";
    }
}

window.onload = function() {
    cp();
    rdB();
};