document.addEventListener('DOMContentLoaded', function() {
    const stateSelect = document.getElementById('state');
    const districtSelect = document.getElementById('district');
 
    const districts = {
        "State1": ["Ernakulam", "Thrissur", "Trivandrum"],
        "State2": ["Chennai", "Coimbatore", "Erode"],
        "State3": ["Mysuru", "Kodagu", "Udupi"]
    };
 
    stateSelect.addEventListener('change', function() {
        const selectedState = this.value;
        districtSelect.innerHTML = '<option value="">Select your district</option>';
        if (districts[selectedState]) {
            districts[selectedState].forEach(function(district) {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        }
    });
 
    document.getElementById('dob').addEventListener('blur', validateDob);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('phone').addEventListener('blur', validatePhone);
    document.getElementById('password').addEventListener('blur', validatePassword);
    document.getElementById('confirm-password').addEventListener('blur', validateConfirmPassword);
 
    function validateDob() {
        const dobInput = document.getElementById('dob');
        const dobError = document.getElementById('dob-error');
        const dob = new Date(dobInput.value);
        const today = new Date();
        if (dob > today) {
            dobError.textContent = "Date of birth cannot be in the future.";
            return false;
        }
        const age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        if (age < 18) {
            dobError.textContent = "You must be at least 18 years old to register.";
            return false;
        }
        dobError.textContent = "";
        return true;
    }
 
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const emailPattern =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = "Please enter a valid email address.";
            return false;
        }
        emailError.textContent = "";
        return true;
    }
 
    function validatePhone() {
        const phoneInput = document.getElementById('phone');
        const phoneError = document.getElementById('phone-error');
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(phoneInput.value)) {
            phoneError.textContent = "Please enter a valid 10-digit phone number.";
            return false;
        }
        phoneError.textContent = "";
        return true;
    }
 
    function validatePassword() {
        const passwordInput = document.getElementById('password');
        const passwordError = document.getElementById('password-error');
        if (passwordInput.value.length < 8) {
            passwordError.textContent = "Password must be at least 8 characters long.";
            return false;
        }
     else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#\$%\^\&*\)\(+=._-]+/.test(password)) {
        document.getElementById('password-error').textContent = 'Password must contain uppercase, lowercase, digit, and special character.';
        return false;
    } else if (password !== confirmPassword) {
        document.getElementById('confirm-password-error').textContent = 'Passwords do not match.';
        return false;
    }
        passwordError.textContent = "";
        return true;
    }
 
    function validateConfirmPassword() {
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const confirmPasswordError = document.getElementById('confirm-password-error');
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordError.textContent = "Passwords do not match.";
            return false;
        }
        confirmPasswordError.textContent = "";
        return true;
    }
 
    window.validateForm = function() {
        return validateDob() && validateEmail() && validatePhone() && validatePassword() && validateConfirmPassword();
    };
});