const inputs = Array.from(document.querySelectorAll(".popup__input"));

function showErrorInput(inputSelector, error){
  inputSelector.classList.add("popup__input_type_error");
  error.classList.add("popup__error_visible");
  error.textContent = inputSelector.validationMessage;
}

function hideErrorInput(inputSelector, error) {
  inputSelector.classList.remove("popup__input_type_error");
  error.classList.remove("popup__error_visible");
  error.textContent = "";
}

const isValid = (inputSelector, error) =>{
  if (inputSelector.validity.valid){
    hideErrorInput(inputSelector, error);
  } else {
    showErrorInput(inputSelector, error)
  }

}

inputs.forEach(inputSelector => {
  inputSelector.addEventListener("input", () => {
    const error = document.querySelector(`#${inputSelector.id}-error`);
// проверяет поля на валидность и показ/скрыв.ошибку
    isValid(inputSelector, error);
    // кнопка актив/неактив
    // const hasInvalid

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