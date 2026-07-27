const API_BASE_URL = "https://hgd7eyusfj.execute-api.ap-south-1.amazonaws.com/Prod";

async function submitStudentData() {
    const sId = document.getElementById("studentId").value;
    const sName = document.getElementById("studentName").value;
    const sEmail = document.getElementById("studentEmail").value;
    const sCourse = document.getElementById("studentCourse").value;

    if(!sId || !sName || !sEmail || !sCourse) {
        updateResponseArea({error: "All fields are required"}, true);
        return;
    }

    const payload = {
        id: sId,
        name: sName,
        email: sEmail,
        course: sCourse
    };

    try {
        const response = await fetch(`${API_BASE_URL}/student`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        updateResponseArea(result, !response.ok);
    } catch (error) {
        updateResponseArea({error: "Network error or API unavailable"}, true);
    }
}

function updateResponseArea(data, isError) {
    const respArea = document.getElementById("response-area");
    respArea.innerText = JSON.stringify(data, null, 2);
    respArea.classList.add("visible");
    respArea.style.borderColor = isError ? "#e74c3c" : "rgba(255,255,255,0.08)";
    respArea.style.color = isError ? "#e74c3c" : "rgba(224,224,224,0.8)";
}