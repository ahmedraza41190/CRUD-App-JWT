// show Password
function showPassword(event) {
    event.target.className = "bi bi-eye";
    event.target.previousElementSibling.type = "text";
    event.target.removeEventListener('click', showPassword);
    event.target.addEventListener('click', hidePassword);
}

// hide password
function hidePassword(event) {
    event.target.className = "bi bi-eye-slash";
    event.target.previousElementSibling.type = "password";
    event.target.removeEventListener('click', hidePassword);
    event.target.addEventListener('click', showPassword);
}


function signup(event) {
    event.preventDefault();
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let email = document.getElementById("email-signup").value;
    let password = document.getElementById("password-signup").value;
    let message = document.querySelector(".validationMessage");

    if (!email.endsWith("@gmail.com")) {
        message.innerText = `Invalid email address`;
        message.style.display = "block";
        message.style.color = "#e55865";
        return;
    }

    if (
        firstName.trim() === '' ||
        lastName.trim() === '' ||
        email.trim() === '' ||
        password.trim() === '' 
    ) {
        message.innerText = `Please fill required fields`;
        message.style.display = "block";
        message.style.color = "#e55865";
        return;
    }

    axios.post(`/api/v1/signup`, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
        .then(function(response) {
            message.style.display = "none"
            Swal.fire({
                icon: 'success',
                title: 'Signup Successful',
                timer: 1000,
                showConfirmButton: false
            });
            window.location.pathname = "/"
        })
        .catch(function(error) {
            // handle error
            console.log(error.data);
            Swal.fire({
                icon: 'error',
                title: 'User already exists',
                timer: 1000,
                showConfirmButton: false
            });
            return;
        });

    // Reset the input fields after successful signup
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("email-signup").value = "";
    document.getElementById("password-signup").value = "";
}