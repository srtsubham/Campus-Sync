let cr = document.getElementById("c");

document.addEventListener("mousemove", e => {
    cr.style.left = e.clientX + "px";
    cr.style.top = e.clientY + "px";
});

document.addEventListener("mousedown", () => cr.classList.add("clk"));
document.addEventListener("mouseup", () => cr.classList.remove("clk"));

function ts() { 
    document.getElementById("nb").classList.toggle("sh"); 
}

const p = "ap-south-1_t98NCsCga";
const c = "5jvj3v12i36l2dfkm4odtln9v0";
const b = "https://hgd7eyusfj.execute-api.ap-south-1.amazonaws.com/Prod";

let d = { UserPoolId: p, ClientId: c };
let up = new AmazonCognitoIdentity.CognitoUserPool(d);

function tog(v) {
    if (v === 1) {
        document.getElementById("lf").style.display = "none";
        document.getElementById("rf").style.display = "block";
    } else {
        document.getElementById("lf").style.display = "block";
        document.getElementById("rf").style.display = "none";
    }
}

function login() {
    let u = document.getElementById("u").value;
    let pw = document.getElementById("p").value;
    let ad = new AmazonCognitoIdentity.AuthenticationDetails({ Username: u, Password: pw });
    let cu = new AmazonCognitoIdentity.CognitoUser({ Username: u, Pool: up });
    
    cu.setAuthenticationFlowType('USER_PASSWORD_AUTH');
    
    cu.authenticateUser(ad, {
        onSuccess: function(res) {
            localStorage.setItem("tok", res.getIdToken().getJwtToken());
            window.location.href = "dashboard.html";
        },
        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        }
    });
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

window.addEventListener("scroll", () => {
    let hd = document.getElementById("head");
    let ft = document.getElementById("foot");
    let stc = document.getElementById("stc");
    let txt = document.getElementById("stxt");

    if (stc && hd && ft && txt) {
        let rect = stc.getBoundingClientRect();
        let wh = window.innerHeight;

        if (rect.top < wh * 0.7 && rect.bottom > wh * 0.3) {
            hd.style.transform = "translateY(-100%)";
            ft.style.transform = "translateY(100%)";
            document.getElementById("nb").classList.remove("sh");
        } else {
            hd.style.transform = "translateY(0)";
            ft.style.transform = "translateY(0)";
        }

        let full = txt.getAttribute("data-full");
        let prog = (wh - rect.top) / (wh + rect.height);
        prog = Math.max(0, Math.min(1, prog));
        let chars = Math.floor(prog * full.length);
        txt.innerText = full.substring(0, chars);
    }
});