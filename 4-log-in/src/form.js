const form = document.querySelector("form");
const submitBtn = document.getElementById("submit-btn");

let inputName;
let inputId;
let inputValue;
let formIsValid;

const inputs = [];
// const input = {
//   inputName: '',
//   inputId: '',
//   inputValue: '',
//   isValid: ''
// }

const formElements = Array.from(form.elements);
// console.log(formElements);

function inputChangeHandler(event) {
  const inputElement = document.getElementById(event.target.id);
  const inputIndex = inputs.findIndex((input) => input.id === event.target.id);
  const updatedInput = { ...inputs[inputIndex] };

  updatedInput.value = event.target.value;
  updatedInput.isValid = validateInputs(updatedInput.name, event.target.value);

  if (updatedInput.isValid) {
    inputElement.parentElement.classList.add("success");
    inputElement.parentElement.classList.remove("error");
  } else {
    inputElement.parentElement.classList.add("error");
    inputElement.parentElement.classList.remove("success");
  }

  inputs[inputIndex] = { ...updatedInput };

  formIsValid = inputs.every((input) => input.isValid === true);
  submitBtn.disabled = !formIsValid;
  // console.log(formIsValid);
  // console.log(event.target);
  // console.log(updatedInput);
}

formElements.forEach((element, ind) => {
  if (element.type === "submit") return;
  // const parentElement = element.parentElement;
  const input = document.getElementById(element.id);
  input.addEventListener("input", inputChangeHandler);
  inputs.push({
    name: element.name,
    id: element.id,
    value: element.value,
    isValid: false,
  });
});

form.addEventListener("submit", (event) => {
  console.log(inputs);
  console.log(formIsValid);
  event.preventDefault();
});

// username.addEventListener("change", (e) => {
//   if (validateUsername(e.target.value)) {
//     username.parentElement.classList.add("success");
//     username.parentElement.classList.remove("error");
//   } else {
//     username.parentElement.classList.add("error");
//     username.parentElement.classList.remove("success");
//   }
// });

function validateInputs(inputName, inputValue) {
  switch (inputName) {
    case "username":
      return validateUsername(inputValue);
    case "email":
      return validateEmail(inputValue);
    case "password":
      return validatePassword(inputValue);
    case "confirmPassword":
      return validateConfirmPassword(inputValue);
    default:
      return true;
  }
}

function validateUsername(username) {
  return username.trim().length >= 5;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  return password.trim().length >= 5;
}

function validateConfirmPassword(confirmPassword) {
  const password = inputs.find((input) => input.id === "password");
  // console.log(password);
  // console.log(confirmPassword);
  return (
    confirmPassword === password.value && validatePassword(confirmPassword)
  );
}
