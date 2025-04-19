
const signupToggleButton = document.getElementById("signup-toggle-btn");
const signinToggleButton = document.getElementById("signin-back-toggle");
const signinSection = document.getElementById("signin-section");
const signupSection = document.getElementById("signup-section");

signinToggleButton.addEventListener("click", () => {
    if (signinSection.style.display === "none") {
        signinSection.style.display = "flex";
        signupSection.style.display = "none";
    }
});

signupToggleButton.addEventListener("click", () => {
    if (signupSection.style.display === "none") {
        signupSection.style.display = "flex";
        signinSection.style.display = "none";
    }
});