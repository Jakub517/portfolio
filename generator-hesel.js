document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generate-button");
    const copyButton = document.getElementById("copy-button");
    const passwordField = document.getElementById("password");
    const passwordStrength = document.getElementById("password-strength");

    generateButton.addEventListener("click", function() {
        const password = generatePassword();
        passwordField.textContent = password;
        copyButton.style.display = "inline-block";
        updatePasswordStrength(password);
    });

    copyButton.addEventListener("click", function() {
        copyToClipboard(passwordField.textContent);
        copyButton.classList.add("copied");
        setTimeout(function() {
            copyButton.classList.remove("copied");
        }, 1000);
    });

    function generatePassword() {
        const length = parseInt(document.getElementById("password-length").value);
        const includeUppercase = document.getElementById("include-uppercase").checked;
        const includeSpecial = document.getElementById("include-special").checked;
        const includeNumbers = document.getElementById("include-numbers").checked;
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const specialChars = "!@#$%^&*";
        const numberChars = "0123456789";

        let chars = lowercaseChars;

        if (includeUppercase) {
            chars += uppercaseChars;
        }

        if (includeSpecial) {
            chars += specialChars;
        }

        if (includeNumbers) {
            chars += numberChars;
        }

        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars.charAt(randomIndex);
        }

        return password;
    }

    function updatePasswordStrength(password) {
        const length = password.length;
        const hasUppercase = /[A-Z]/.test(password);
        const hasSpecialChars = /[!@#$%^&*]/.test(password);
        const hasNumbers = /[0-9]/.test(password);

        if (length < 8 || (!hasUppercase && !hasSpecialChars && !hasNumbers)) {
            passwordStrength.innerHTML = '<strong class="very-weak">Velmi slabé heslo</strong>';
        } else if (length < 12 || (!hasUppercase && !hasSpecialChars) || (!hasSpecialChars && !hasNumbers) || (!hasUppercase && !hasNumbers)) {
            passwordStrength.innerHTML = '<strong class="weak">Slabé heslo</strong>';
        } else if (length >= 12 && hasUppercase && hasSpecialChars && hasNumbers) {
            passwordStrength.innerHTML = '<strong class="very-strong">Velmi silné heslo</strong>';
        } else {
            passwordStrength.innerHTML = '<strong class="strong">Silné heslo</strong>';
        }
    }

    function copyToClipboard(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    }
});
