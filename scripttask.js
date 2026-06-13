// 1. Element Selectors
const projectForm = document.getElementById('projectForm');
const studentIdInput = document.getElementById('studentId');
const projectNameInput = document.getElementById('projectName');
const projectTechSelect = document.getElementById('projectTech');
const tableBody = document.getElementById('tableBody');

// 2. Focused Validation Rules
function validateStudentId() {
    const group = document.getElementById('studentIdGroup');
    const error = document.getElementById('studentIdError');
    if (studentIdInput.value.trim() === '') {
        error.textContent = 'Student ID is required.';
        group.classList.add('invalid');
        return false;
    } else {
        error.textContent = '';
        group.classList.remove('invalid');
        return true;
    }
}

// Check for empty values on layout string targets
function validateProjectName() {
    const group = document.getElementById('projectNameGroup');
    const error = document.getElementById('nameError');
    if (projectNameInput.value.trim() === '') {
        error.textContent = 'Project Title is required.';
        group.classList.add('invalid');
        return false;
    } else {
        error.textContent = '';
        group.classList.remove('invalid');
        return true;
    }
}

function validateProjectTech() {
    const group = document.getElementById('projectTechGroup');
    const error = document.getElementById('techError');
    if (projectTechSelect.value === '') {
        error.textContent = 'Please select a core technology platform.';
        group.classList.add('invalid');
        return false;
    } else {
        error.textContent = '';
        group.classList.remove('invalid');
        return true;
    }
}

// 3. Real-Time Tracking Input Binding Events
studentIdInput.addEventListener('input', validateStudentId);
studentIdInput.addEventListener('blur', validateStudentId);

projectNameInput.addEventListener('input', validateProjectName);
projectNameInput.addEventListener('blur', validateProjectName);

projectTechSelect.addEventListener('change', validateProjectTech);

// 4. Form Action Interception Processing
projectForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Run all isolated validation checks cleanly
    const isIdValid = validateStudentId();
    const isNameValid = validateProjectName();
    const isTechValid = validateProjectTech();

    // Only inject record row if validation flags return true
    if (isIdValid && isNameValid && isTechValid) {
        addProjectToTable(
            studentIdInput.value.trim(),
            projectNameInput.value.trim(),
            projectTechSelect.value
        );

        // Reset inputs and completely remove lingering error highlights
        projectForm.reset();
    }
});

// 5. Structure Generation Engine
function addProjectToTable(studentId, name, tech) {
    const row = document.createElement('tr');

    // Generate inner document row cells
    const idCell = document.createElement('td');
    idCell.textContent = studentId;

    const nameCell = document.createElement('td');
    nameCell.textContent = name;

    const techCell = document.createElement('td');
    techCell.textContent = tech;

    const statusCell = document.createElement('td');
    statusCell.innerHTML = `<span class="status-badge">Active</span>`;

    const actionCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Dismiss';
    deleteBtn.className = 'action-btn';

    // Bind removal directly to the current unique dynamic DOM row
    deleteBtn.addEventListener('click', function () {
        row.remove();
    });

    actionCell.appendChild(deleteBtn);

    // Assembly sequence
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(techCell);
    row.appendChild(statusCell);
    row.appendChild(actionCell);

    // Append complete row into application DOM view
    tableBody.appendChild(row);
}
