// Section switch
function showSection(sectionId) {
    document.querySelectorAll(".card").forEach(card => {
        if (card.id) card.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
}

// Store last calculated semester
let lastGPA = 0;
let lastCredits = 0;
let semesterCount = 0;

// Add subject inputs
function addSubject() {
    let div = document.createElement("div");

    div.innerHTML = `
        <input type="number" placeholder="Grade">
        <input type="number" placeholder="Credit">
    `;

    document.getElementById("subjects").appendChild(div);
}

// Calculate GPA
function calcGPA() {
    let subjects = document.getElementById("subjects").children;

    let totalPoints = 0;
    let totalCredits = 0;

    for (let sub of subjects) {
        let grade = parseFloat(sub.children[0].value);
        let credit = parseFloat(sub.children[1].value);

        if (!isNaN(grade) && !isNaN(credit)) {
            totalPoints += grade * credit;
            totalCredits += credit;
        }
    }

    if (totalCredits === 0) {
        alert("Enter valid data");
        return;
    }

    let gpa = totalPoints / totalCredits;

    lastGPA = gpa;
    lastCredits = totalCredits;

    document.getElementById("gpaResult").innerText =
        "Semester GPA: " + gpa.toFixed(2);
}

// Transfer to CGPA
function transferToCGPA() {
    if (lastCredits === 0) {
        alert("Calculate GPA first!");
        return;
    }

    semesterCount++;

    let div = document.createElement("div");

    div.innerHTML = `
        <div class="sem-label">Semester ${semesterCount}</div>
        <input type="number" value="${lastGPA.toFixed(2)}" placeholder="GPA">
        <input type="number" value="${lastCredits}" placeholder="Total Credits">
    `;

    document.getElementById("semesters").appendChild(div);

    // ✅ Auto-clear subjects
    document.getElementById("subjects").innerHTML = "";
    document.getElementById("gpaResult").innerText = "";

    lastGPA = 0;
    lastCredits = 0;

    alert("Semester added and cleared!");
}

// Manual semester entry
function addSemester() {
    semesterCount++;

    let div = document.createElement("div");

    div.innerHTML = `
        <div class="sem-label">Semester ${semesterCount}</div>
        <input type="number" placeholder="GPA">
        <input type="number" placeholder="Total Credits">
    `;

    document.getElementById("semesters").appendChild(div);
}

// Calculate CGPA
function calcCGPA() {
    let semesters = document.getElementById("semesters").children;

    let totalPoints = 0;
    let totalCredits = 0;

    for (let sem of semesters) {
        let gpa = parseFloat(sem.children[1].value);
        let credit = parseFloat(sem.children[2].value);

        if (!isNaN(gpa) && !isNaN(credit)) {
            totalPoints += gpa * credit;
            totalCredits += credit;
        }
    }

    if (totalCredits === 0) {
        alert("Enter valid data");
        return;
    }

    let cgpa = totalPoints / totalCredits;

    document.getElementById("cgpaResult").innerText =
        "CGPA: " + cgpa.toFixed(2);
}