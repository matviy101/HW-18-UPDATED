document.getElementById("get-students-btn").addEventListener("click", getStudents);

document.getElementById("add-student-form").addEventListener("submit", addStudent);

async function getStudents() {
    try {
        const res = await fetch("http://localhost:3000/students");
        const students = await res.json();

        const tbody = document.querySelector("#students-table tbody");
        tbody.innerHTML = "";

        students.forEach(student => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.course}</td>
                <td>${student.skills.join(", ")}</td>
                <td>${student.email}</td>
                <td>${student.isEnrolled ? "YES" : "NO"}</td>
                <td>
                    <button class="edit-btn">Update</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;

            const editBtn = row.querySelector(".edit-btn");
            const deleteBtn = row.querySelector(".delete-btn");

            editBtn.addEventListener("click", () => {
                updateStudent(student.id);
            });

            deleteBtn.addEventListener("click", () => {
                deleteStudent(student.id);
            });

            tbody.appendChild(row);
        });

    } catch (error) {
        console.error(error);
    }
}

async function addStudent(e) {
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        course: document.getElementById("course").value,
        skills: document.getElementById("skills").value
            .split(",")
            .map(skill => skill.trim()),
        email: document.getElementById("email").value,
        isEnrolled: document.getElementById("isEnrolled").checked
    };

    try {
        const res = await fetch("http://localhost:3000/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        const data = await res.json();

        console.log(data);

        getStudents();

    } catch (error) {
        console.error(error);
    }
}

async function updateStudent(id) {
    const student = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        course: document.getElementById("course").value,
        skills: document.getElementById("skills").value
            .split(",")
            .map(skill => skill.trim()),
        email: document.getElementById("email").value,
        isEnrolled: document.getElementById("isEnrolled").checked
    };

    try {
        const res = await fetch(`http://localhost:3000/students/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        const data = await res.json();

        console.log(data);

        getStudents();

    } catch (error) {
        console.error(error);
    }
}

async function deleteStudent(id) {
    try {
        await fetch(`http://localhost:3000/students/${id}`, {
            method: "DELETE"
        });

        getStudents();

    } catch (error) {
        console.error(error);
    }
}