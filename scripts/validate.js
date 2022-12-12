// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });

// const enableValidation = function(config) {

// };

const forms = [...document.querySelectorAll(".popup__form")];

function checkInputValid(inputSelector) {
  const errorClass = document.querySelector(`#${inputSelector.id}-error`);

  if (inputSelector.validity.valid) {
    errorClass.textContent = "";
    inputSelector.classList.remove("popup__input_type_error");
  } else {
    errorClass.textContent = inputSelector.validationMessage;
    inputSelector.classList.add("popup__input_type_error");
  }
}

function toggleSubmitButton(inputsSelector, submitButtonSelector) {
  const isInputValid = inputsSelector.every((inputSelector) => {
    return inputSelector.validity.valid;
  });

  if (isInputValid) {
    submitButtonSelector.classList.remove("popup__button_disabled");
    submitButtonSelector.disabled = "";
  } else {
    submitButtonSelector.disabled = "disabled";
    submitButtonSelector.classList.add("popup__button_disabled");
  }
}

forms.forEach((formSelector) => {
  const inputsSelector = [...formSelector.querySelectorAll(".popup__input")];
  const submitButtonSelector = formSelector.querySelector(".popup__button");

  formSelector.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });

  // toggleSubmitButton(inputsSelector, submitButtonSelector);

  inputsSelector.forEach((inputSelector) => {
    inputSelector.addEventListener("input", () => {
      checkInputValid(inputSelector);
      toggleSubmitButton(inputsSelector, submitButtonSelector);
    });
  });
});
