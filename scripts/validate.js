


const inputs = Array.from(document.querySelectorAll(".popup__input"));

function showErrorInput(inputSelector, error){
  inputSelector.classList.add("popup__input_type-error");
  error.classList.add("popup__error_visible");
  error.textContent = inputSelector.validationMessage;
}

function hideErrorInput(inputSelector, error) {
  inputSelector.classList.remove("popup__input_type-error");
  error.classList.remove("popup__error_visible");
  error.textContent = "";
}

inputs.forEach(inputSelector => {
  inputSelector.addEventListener("input", () => {
    const error = document.querySelector(`#${inputSelector.id}-error`);
    
    if (inputSelector.validity.valid){
      hideErrorInput(inputSelector, error);
    } else {
      showErrorInput(inputSelector, error)
    }

    

  })
})

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type-error',
//   errorClass: 'popup__error_visible'
// }); 