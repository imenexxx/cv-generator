// ===========================
// STATE
// ===========================
let currentTemplate = 1; // 1 = Classic (free), 2 = Modern (pro)
const IS_PRO = false; // ← mettre true après paiement Stripe

// ===========================
// FORM INPUTS
// ===========================
const fullNameInput  = document.getElementById("fullName");
const jobTitleInput  = document.getElementById("jobTitle");
const emailInput     = document.getElementById("email");
const phoneInput     = document.getElementById("phone");
const locationInput  = document.getElementById("location");
const summaryInput   = document.getElementById("summary");

const skillsContainer    = document.getElementById("skillsContainer");
const addSkillBtn        = document.getElementById("addSkillBtn");
const educationContainer = document.getElementById("educationContainer");
const addEducationBtn    = document.getElementById("addEducationBtn");
const experienceContainer= document.getElementById("experienceContainer");
const addExperienceBtn   = document.getElementById("addExperienceBtn");

const downloadBtn  = document.getElementById("downloadBtn");
const proBanner    = document.getElementById("pro-banner");

// ===========================
// TEMPLATE SWITCHER
// ===========================
function setTemplate(n) {
  currentTemplate = n;

  // Update buttons
  document.querySelectorAll(".tpl-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`[data-tpl="${n}"]`).classList.add("active");

  // Show / hide previews
  document.getElementById("cvPreview").style.display  = n === 1 ? "block" : "none";
  document.getElementById("cvPreview2").style.display = n === 2 ? "flex"  : "none";

  // Pro banner
  proBanner.style.display = n === 2 ? "block" : "none";

  updatePreview();
}

// ===========================
// UPDATE PREVIEW
// ===========================
function updatePreview() {
  const name     = fullNameInput.value.trim()  || "Your Name";
  const title    = jobTitleInput.value.trim()  || "Job Title";
  const email    = emailInput.value.trim()     || "email@example.com";
  const phone    = phoneInput.value.trim()     || "+000 000 000";
  const loc      = locationInput.value.trim()  || "City, Country";
  const summary  = summaryInput.value.trim()   || "Your professional summary will appear here.";

  const contactParts = [];
  if (emailInput.value)    contactParts.push(emailInput.value);
  if (phoneInput.value)    contactParts.push(phoneInput.value);
  if (locationInput.value) contactParts.push(locationInput.value);
  const contact = contactParts.join(" | ") || "Email | Phone | Location";

  // Skills
  const skillInputs = document.querySelectorAll(".skillInput");
  const skills = [...skillInputs].map(i => i.value.trim()).filter(Boolean);
  const skillsHTML = skills.length ? skills.map(s => `<li>${s}</li>`).join("") : "<li>Your skills will appear here</li>";

  // Education
  const eduInputs = document.querySelectorAll(".educationInput");
  const edus = [...eduInputs].map(i => i.value.trim()).filter(Boolean);
  const eduHTML = edus.length ? edus.map(e => `<li>${e}</li>`).join("") : "<li>Your education will appear here</li>";

  // Experience
  const expInputs = document.querySelectorAll(".experienceInput");
  const exps = [...expInputs].map(i => i.value.trim()).filter(Boolean);
  const expHTML = exps.length ? exps.map(e => `<li>${e}</li>`).join("") : "<li>Your experience will appear here</li>";

  // --- TEMPLATE 1 ---
  document.getElementById("previewName").textContent    = name;
  document.getElementById("previewTitle").textContent   = title;
  document.getElementById("previewContact").textContent = contact;
  document.getElementById("previewSummary").textContent = summary;
  document.getElementById("previewSkills").innerHTML    = skillsHTML;
  document.getElementById("previewEducation").innerHTML = eduHTML;
  document.getElementById("previewExperience").innerHTML= expHTML;

  // Watermark template 1 (always free)
  document.getElementById("watermark1").style.display = "block";

  // --- TEMPLATE 2 ---
  // Initials avatar
  const initials = name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase() || "YN";
  document.getElementById("previewInitials").textContent   = initials;
  document.getElementById("previewName2").textContent      = name;
  document.getElementById("previewTitle2").textContent     = title;
  document.getElementById("previewEmail2").textContent     = email;
  document.getElementById("previewPhone2").textContent     = phone;
  document.getElementById("previewLocation2").textContent  = loc;
  document.getElementById("previewSummary2").textContent   = summary;
  document.getElementById("previewSkills2").innerHTML      = skillsHTML;
  document.getElementById("previewEducation2").innerHTML   = eduHTML;
  document.getElementById("previewExperience2").innerHTML  = expHTML;

  // Watermark template 2 (pro — hidden if paid)
  document.getElementById("watermark2").style.display = IS_PRO ? "none" : "block";
}

// ===========================
// EVENT LISTENERS
// ===========================
[fullNameInput, jobTitleInput, emailInput, phoneInput, locationInput, summaryInput]
  .forEach(input => input.addEventListener("input", updatePreview));

addSkillBtn.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "text"; input.className = "skillInput"; input.placeholder = "New Skill";
  input.addEventListener("input", updatePreview);
  skillsContainer.appendChild(input);
});

addEducationBtn.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "text"; input.className = "educationInput"; input.placeholder = "New Education";
  input.addEventListener("input", updatePreview);
  educationContainer.appendChild(input);
});

addExperienceBtn.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "text"; input.className = "experienceInput"; input.placeholder = "New Experience";
  input.addEventListener("input", updatePreview);
  experienceContainer.appendChild(input);
});

// ===========================
// PDF DOWNLOAD
// ===========================
downloadBtn.addEventListener("click", () => {
  updatePreview();

  const cvElement = currentTemplate === 1
    ? document.getElementById("cvPreview")
    : document.getElementById("cvPreview2");

  setTimeout(() => {
    html2pdf().set({
      margin: 0.5,
      filename: `${fullNameInput.value.trim() || "CV"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, scrollY: 0 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    }).from(cvElement).save();
  }, 100);
});

// ===========================
// INIT
// ===========================
updatePreview();
