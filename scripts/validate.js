const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const forms = Array.from(document.querySelectorAll(config.formSelector));

forms.forEach((formSelector) => {
  const inputs = Array.from(
    formSelector.querySelectorAll(config.inputSelector)
  );
  const buttonSubmit = formSelector.querySelector(config.submitButtonSelector);

  formSelector.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  inputs.forEach((inputSelector) => {
    inputSelector.addEventListener("input", () => {
      const error = document.querySelector(`#${inputSelector.id}-error`);

      if (inputSelector.validity.valid) {
        inputSelector.classList.remove(config.inputErrorClass);
        error.classList.remove(config.errorClass);
        error.textContent = "";
      } else {
        inputSelector.classList.add(config.inputErrorClass);
        error.classList.add(config.errorClass);
        error.textContent = inputSelector.validationMessage;
      }

      const isValidForm = inputs.every(
        (inputSelector) => inputSelector.validity.valid
      );
      if (isValidForm) {
        buttonSubmit.classList.remove(config.inactiveButtonClass);
        buttonSubmit.removeAttribute("disabled");
      } else {
        buttonSubmit.classList.add(config.inactiveButtonClass);
        buttonSubmit.setAttribute("disabled", true);
      }
    });
  });
});
