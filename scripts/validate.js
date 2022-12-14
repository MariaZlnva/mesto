const hideError = (inputSelector, error, config) => {
  inputSelector.classList.remove(config.inputErrorClass);
  error.classList.remove(config.errorClass);
  error.textContent = "";
};

const showError = (inputSelector, error, config) => {
  inputSelector.classList.add(config.inputErrorClass);
  error.classList.add(config.errorClass);
  error.textContent = inputSelector.validationMessage;
};

const checkValidityInput = (inputSelector, config) => {
  const error = document.querySelector(`#${inputSelector.id}-error`);
  if (inputSelector.validity.valid) {
    hideError(inputSelector, error, config);
  } else {
    showError(inputSelector, error, config);
  }
};

const isValidForm = (inputs) => {
  return inputs.every((inputSelector) => {
    return inputSelector.validity.valid;
  });
};
const toggleButtonState = (inputs, buttonSubmit, config) => {
  if (isValidForm(inputs)) {
    buttonSubmit.classList.remove(config.inactiveButtonClass);
    buttonSubmit.removeAttribute("disabled");
  } else {
    buttonSubmit.classList.add(config.inactiveButtonClass);
    buttonSubmit.disabled = true;
  }
};

const setEventListeners = (formSelector, config) => {
  const inputs = Array.from(
    formSelector.querySelectorAll(config.inputSelector)
  );
  const buttonSubmit = formSelector.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, buttonSubmit, config);

  formSelector.addEventListener("reset", function () {
    setTimeout(() => {
      toggleButtonState(inputs, buttonSubmit, config);
    }, 0);
  });

  inputs.forEach((inputSelector) => {
    inputSelector.addEventListener("input", () => {
      checkValidityInput(inputSelector, config);
      toggleButtonState(inputs, buttonSubmit, config);
    });
  });
};

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach((formSelector) => {
    formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formSelector, config);
  });
};
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
