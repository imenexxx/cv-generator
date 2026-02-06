// FORM INPUTS
const fullNameInput = document.getElementById("fullName");
const jobTitleInput = document.getElementById("jobTitle");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const locationInput = document.getElementById("location");
const summaryInput = document.getElementById("summary");

// Dynamic containers
const skillsContainer = document.getElementById("skillsContainer");
const addSkillBtn = document.getElementById("addSkillBtn");

const educationContainer = document.getElementById("educationContainer");
const addEducationBtn = document.getElementById("addEducationBtn");

const experienceContainer = document.getElementById("experienceContainer");
const addExperienceBtn = document.getElementById("addExperienceBtn");

// PREVIEW ELEMENTS
const previewName = document.getElementById("previewName");
const previewTitle = document.getElementById("previewTitle");
const previewContact = document.getElementById("previewContact");
const previewSummary = document.getElementById("previewSummary");
const previewSkills = document.getElementById("previewSkills");
const previewEducation = document.getElementById("previewEducation");
const previewExperience = document.getElementById("previewExperience");

// PDF BUTTON
const downloadBtn = document.getElementById("downloadBtn");

// ===================
// Function: Update Preview
// ===================
function updatePreview() {
  // Personal Info
  previewName.textContent = fullNameInput.value.trim() || "Your Name";
  previewTitle.textContent = jobTitleInput.value.trim() || "Job Title";

  const contactParts = [];
  if(emailInput.value) contactParts.push(emailInput.value);
  if(phoneInput.value) contactParts.push(phoneInput.value);
  if(locationInput.value) contactParts.push(locationInput.value);
  previewContact.textContent = contactParts.join(" | ") || "Email | Phone | Location";

  // Summary
  previewSummary.textContent = summaryInput.value.trim() || "Your professional summary will appear here.";

  // Skills
  const skillInputs = document.querySelectorAll(".skillInput");
  const skills = [];
  skillInputs.forEach(input => { if(input.value.trim()!=="") skills.push(input.value.trim()); });
  previewSkills.innerHTML = skills.length ? skills.map(s=>`<li>${s}</li>`).join("") : "<li>Your skills will appear here</li>";

  // Education
  const eduInputs = document.querySelectorAll(".educationInput");
  const educations = [];
  eduInputs.forEach(input => { if(input.value.trim()!=="") educations.push(input.value.trim()); });
  previewEducation.innerHTML = educations.length ? educations.map(e=>`<li>${e}</li>`).join("") : "<li>Your education will appear here</li>";

  // Experience
  const expInputs = document.querySelectorAll(".experienceInput");
  const experiences = [];
  expInputs.forEach(input => { if(input.value.trim()!=="") experiences.push(input.value.trim()); });
  previewExperience.innerHTML = experiences.length ? experiences.map(e=>`<li>${e}</li>`).join("") : "<li>Your experience will appear here</li>";
}

// ===================
// Event Listeners for static inputs
// ===================
[fullNameInput, jobTitleInput, emailInput, phoneInput, locationInput, summaryInput].forEach(input => input.addEventListener("input", updatePreview));

// ===================
// Add Dynamic Inputs
// ===================
addSkillBtn.addEventListener("click", ()=>{
  const input = document.createElement("input");
  input.type="text"; input.className="skillInput"; input.placeholder="New Skill";
  input.addEventListener("input", updatePreview);
  skillsContainer.appendChild(input);
});

addEducationBtn.addEventListener("click", ()=>{
  const input = document.createElement("input");
  input.type="text"; input.className="educationInput"; input.placeholder="New Education";
  input.addEventListener("input", updatePreview);
  educationContainer.appendChild(input);
});

addExperienceBtn.addEventListener("click", ()=>{
  const input = document.createElement("input");
  input.type="text"; input.className="experienceInput"; input.placeholder="New Experience";
  input.addEventListener("input", updatePreview);
  experienceContainer.appendChild(input);
});

// ===================
// PDF Download
// ===================
downloadBtn.addEventListener("click", ()=>{
  // 1️⃣ Mettre à jour le preview avant le PDF
  updatePreview();

  const cvElement = document.getElementById("cvPreview");

  // 2️⃣ Petite pause pour être sûr que le DOM est rendu
  setTimeout(()=>{
    html2pdf().set({
      margin:0.5,
      filename:`${fullNameInput.value.trim() || "CV"}.pdf`,
      image:{type:'jpeg', quality:0.98},
      html2canvas:{scale:2, scrollY:0},
      jsPDF:{unit:'in', format:'a4', orientation:'portrait'}
    }).from(cvElement).save();
  }, 100); // 100ms suffit
});

// ===================
// INIT
// ===================
updatePreview();
