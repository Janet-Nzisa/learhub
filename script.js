
// Display the current year in the footer
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });
}


// Welcome button
const welcomeButton = document.getElementById("welcomeButton");

if (welcomeButton) {
    welcomeButton.addEventListener("click", function () {
        alert("Welcome to LearnHub! We are happy to support your learning journey.");
    });
}


// Automatically select a course from the URL
const courseSelect = document.getElementById("course");

if (courseSelect) {
    const parameters = new URLSearchParams(window.location.search);
    const selectedCourse = parameters.get("course");

    if (selectedCourse) {
        courseSelect.value = selectedCourse;
    }
}


// Registration form validation
const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const gender = document.getElementById("gender").value;
        const course = document.getElementById("course").value;
        const goal = document.getElementById("goal").value.trim();
        const consent = document.getElementById("consent").checked;
        const formMessage = document.getElementById("formMessage");

        if (fullName.length < 3) {
            showMessage(formMessage, "Please enter a valid full name.", "error");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMessage(formMessage, "Please enter a valid email address.", "error");
            return;
        }

        if (!/^[0-9+() -]{7,20}$/.test(phone)) {
            showMessage(formMessage, "Please enter a valid phone number.", "error");
            return;
        }

        if (!gender || !course) {
            showMessage(formMessage, "Please select your gender and course.", "error");
            return;
        }

        if (!consent) {
            showMessage(formMessage, "Please confirm that your information is correct.", "error");
            return;
        }

        // Save only necessary registration details
        // Do not save passwords or other sensitive information.
        const registration = {
            fullName: fullName,
            email: email,
            phone: phone,
            gender: gender,
            course: course,
            goal: goal,
            submittedAt: new Date().toLocaleString()
        };

        try {
            const savedRegistrations =
                JSON.parse(localStorage.getItem("learnhubRegistrations")) || [];

            savedRegistrations.push(registration);

            localStorage.setItem(
                "learnhubRegistrations",
                JSON.stringify(savedRegistrations)
            );

           showMessage(
    formMessage,
    "Registration successful! Redirecting you...",
    "success"
);

registrationForm.reset();

// Redirect to the thank-you page after 1 second
setTimeout(function () {
    window.location.href = "thankyou.html";
}, 1000);

        } catch (error) {
            showMessage(
                formMessage,
                "Your browser could not save the registration. Please try again.",
                "error"
            );
        }
    });
}


// Contact form validation
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const contactMessage = document.getElementById("contactMessage");

        if (name.length < 3 || subject.length === 0 || message.length < 10) {
            showMessage(
                contactMessage,
                "Please complete all fields correctly. Your message should have at least 10 characters.",
                "error"
            );
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMessage(
                contactMessage,
                "Please enter a valid email address.",
                "error"
            );
            return;
        }

        showMessage(
            contactMessage,
            "Your message has passed validation. This demonstration website does not send messages to a server.",
            "success"
        );

        contactForm.reset();
    });
}


// Reusable function for displaying form messages
function showMessage(element, message, type) {
    if (!element) return;

    element.textContent = message;
    element.className = "form-message " + type;
}
