const form = document.getElementById('form');
const username = document.getElementById('username');
const firstname = document.getElementById('FirstName');
const lastname = document.getElementById('LastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const togglepassword = document.querySelector('#togglePassword');

//show input error message
function displayError(input, message){
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}
// Show success outline
function displaySuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
   displaySuccess(input);
  } else {
    displayError(input, 'Email is not valid');
  }
}

// Check required fields
function checkFilled(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      displayError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      displaySuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    displayError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    displayError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
   displaySuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    displayError(input2, 'Passwords do not match');
  }
}
togglepassword.addEventListener('click', function(e){
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password' ;
  password.setAttribute('type', type);
  //toggle the eye slash icon
  this.classList.toggle('bi-eye');
})
// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  if(!checkFilled([firstname, lastname, username, email, password, password2])){
    checkLength(firstname, 3, 15);
    checkLength(lastname, 3, 15);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
  }

});
