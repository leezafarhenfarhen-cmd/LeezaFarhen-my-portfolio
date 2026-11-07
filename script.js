
// LOAD DATA FROM JSON FILE

document.addEventListener("DOMContentLoaded", loadPortfolio);

async function loadPortfolio() {

    try {

        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("Unable to load JSON data");
        }

        const data = await response.json();

        // DISPLAY PORTFOLIO
        displayPersonalDetails(data.personal);
        displayAbout(data.about, data.personal);
        displaySkills(data.skills);
        displayProjects(data.projects);
        displayEducation(data.education);
        displayCertifications(data.certifications);
        displaySocialLinks(data.social);

        // SHOW WEBSITE
        document.getElementById("loadingMessage").classList.add("d-none");

        document.getElementById("portfolioContent")
            .classList.remove("d-none");

        // CONTACT FORM
        setupContactForm(data.personal.email);

    } catch (error) {

        console.error("Error:", error);

        document.getElementById("loadingMessage")
            .classList.add("d-none");

        document.getElementById("errorMessage")
            .classList.remove("d-none");
    }
}


// PERSONAL DETAILS

function displayPersonalDetails(personal) {

    document.getElementById("logo").textContent =
        personal.name;

    document.getElementById("heroName").textContent =
        personal.name;

    document.getElementById("heroRole").textContent =
        personal.role;

    document.getElementById("heroIntroduction").textContent =
        personal.introduction;

    document.getElementById("heroGoal").textContent =
        personal.careerGoal;

    document.getElementById("profileImage").src =
        personal.profileImage;

    document.getElementById("resumeLink").href =
        personal.resume;

    document.getElementById("footerName").textContent =
        personal.name;

    document.getElementById("copyright").textContent =
        `© ${new Date().getFullYear()} ${personal.name}. All Rights Reserved.`;
}


// ABOUT SECTION

function displayAbout(about, personal) {

    document.getElementById("aboutTitle").textContent =
        about.title;

    document.getElementById("aboutDescription").textContent =
        about.description;

    document.getElementById("aboutObjective").textContent =
        about.objective;

    document.getElementById("aboutImage").src =
        personal.profileImage;

    document.getElementById("aboutEmail").textContent =
        personal.email;

    document.getElementById("aboutPhone").textContent =
        personal.phone;

    document.getElementById("aboutLocation").textContent =
        personal.location;
}


// SKILLS SECTION

function displaySkills(skills) {

    const container = document.getElementById("skillsContainer");

    container.innerHTML = "";

    skills.forEach(skill => {

        const card = document.createElement("div");

        card.className = "col-md-6 col-lg-4";

        card.innerHTML = `
            <div class="skill-card">
                <i class="bi ${skill.icon} skill-icon"></i>

                <h4>${escapeHTML(skill.name)}</h4>

                <p>${escapeHTML(skill.description)}</p>

                <div class="progress">
                    <div class="progress-bar"
                         role="progressbar"
                         style="width: ${skill.level}%"
                         aria-valuenow="${skill.level}"
                         aria-valuemin="0"
                         aria-valuemax="100">
                    </div>
                </div>

                <small>${skill.level}%</small>
            </div>
        `;

        container.appendChild(card);
    });
}


// PROJECTS SECTION

function displayProjects(projects) {

    const container = document.getElementById("projectsContainer");

    container.innerHTML = "";

    projects.forEach(project => {

        const card = document.createElement("div");

        card.className = "col-md-6 col-lg-4";

        const technologies = project.technologies.map(tech =>
            `<span class="tech-badge">${escapeHTML(tech)}</span>`
        ).join("");

        card.innerHTML = `
            <div class="project-card">

                <img src="${escapeHTML(project.image)}"
                     alt="${escapeHTML(project.name)}"
                     loading="lazy">

                <div class="project-content">

                    <h4>${escapeHTML(project.name)}</h4>

                    <p>${escapeHTML(project.description)}</p>

                    <div class="mb-3">
                        ${technologies}
                    </div>

                    <a href="${safeLink(project.link)}"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="btn btn-primary-custom">
                       View Project
                    </a>

                </div>
            </div>
        `;

        container.appendChild(card);
    });
}


// EDUCATION SECTION

function displayEducation(education) {

    const container = document.getElementById("educationContainer");

    container.innerHTML = "";

    education.forEach(item => {

        const card = document.createElement("div");

        card.className = "col-md-6";

        card.innerHTML = `
            <div class="education-card">

                <i class="bi bi-mortarboard-fill"></i>

                <h4>${escapeHTML(item.course)}</h4>

                <h5>${escapeHTML(item.college)}</h5>

                <p>${escapeHTML(item.semester)}</p>

                <p>${escapeHTML(item.duration)}</p>

                <p>${escapeHTML(item.details)}</p>

            </div>
        `;

        container.appendChild(card);
    });
}


// CERTIFICATIONS SECTION

function displayCertifications(certifications) {

    const container =
        document.getElementById("certificationsContainer");

    container.innerHTML = "";

    certifications.forEach(item => {

        const card = document.createElement("div");

        card.className = "col-md-6 col-lg-4";

        card.innerHTML = `
            <div class="certificate-card">

                <i class="bi bi-award-fill"></i>

                <h4>${escapeHTML(item.name)}</h4>

                <p><strong>Organization:</strong>
                   ${escapeHTML(item.organization)}</p>

                <p><strong>Year:</strong>
                   ${escapeHTML(item.year)}</p>

                <p>${escapeHTML(item.description)}</p>

            </div>
        `;

        container.appendChild(card);
    });
}


// SOCIAL MEDIA LINKS

function displaySocialLinks(social) {

    const heroContainer =
        document.getElementById("heroSocials");

    const footerContainer =
        document.getElementById("footerSocials");

    heroContainer.innerHTML = "";
    footerContainer.innerHTML = "";

    social.forEach(item => {

        const link = `
            <a href="${safeLink(item.url)}"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="${escapeHTML(item.name)}">

                <i class="bi ${item.icon}"></i>

            </a>
        `;

        heroContainer.innerHTML += link;
        footerContainer.innerHTML += link;
    });
}


// BASIC HTML ESCAPING

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, char => {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[char];
    });
}


// ALLOW ONLY SAFE HTTP/HTTPS LINKS

function safeLink(value) {

    try {

        const url = new URL(value, window.location.href);

        if (url.protocol === "http:" ||
            url.protocol === "https:") {

            return escapeHTML(url.href);
        }

    } catch (error) {

        console.error("Invalid URL:", value);
    }

    return "#";
}


// CONTACT FORM VALIDATION

function setupContactForm(contactEmail) {

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const subject = document.getElementById("subject").value.trim();

        const message = document.getElementById("message").value.trim();

        const formMessage = document.getElementById("formMessage");

        formMessage.className = "mt-3 text-danger";

        // CHECK EMPTY FIELDS

        if (!name || !email || !subject || !message) {

            formMessage.textContent =
                "Please fill in all fields.";

            return;
        }

        // EMAIL VALIDATION

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            formMessage.textContent =
                "Please enter a valid email address.";

            return;
        }

        // OPEN EMAIL APPLICATION

        const mailSubject = encodeURIComponent(subject);

        const mailBody = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\n${message}`
        );

        formMessage.className = "mt-3 text-success";

        formMessage.textContent =
            "Opening your email application...";

        window.location.href =
            `mailto:${contactEmail}?subject=${mailSubject}&body=${mailBody}`;

        form.reset();
    });
}
