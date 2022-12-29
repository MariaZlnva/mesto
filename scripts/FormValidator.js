// класс настраивает валидацию полей формы

export default class FormValidator {
  constructor(config, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputs = Array.from(
      this._formSelector.querySelectorAll(this._inputSelector)
    );
    this._buttonSubmit = this._formSelector.querySelector(
      this._submitButtonSelector
    );
  }

  //метод проверяет поля и добавляет/удаляет текст и стиль ошибки
  _checkValidityInput(inputSelector) {
    const error = this._formSelector.querySelector(
      `#${inputSelector.id}-error`
    );
    if (inputSelector.validity.valid) {
      this._hideError(inputSelector, error);
    } else {
      this._showError(inputSelector, error);
    }
  }

  _hideError(inputSelector, error) {
    inputSelector.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = "";
  }

  _showError(inputSelector, error) {
    inputSelector.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass);
    error.textContent = inputSelector.validationMessage;
  }

  // метод проверяет все поля формы на валидность
  _isValidForm() {
    return Array.from(this._inputs).every((inputSelector) => {
      return inputSelector.validity.valid;
    });
  }

  // метод разблокирует/блокирует кнопку сабмита на основании проверки полей формы
  _toggleButtonState() {
    if (this._isValidForm(this._inputs)) {
      this._buttonSubmit.classList.remove(this._inactiveButtonClass);
      this._buttonSubmit.disabled = false;
    } else {
      this._buttonSubmit.classList.add(this._inactiveButtonClass);
      this._buttonSubmit.disabled = true;
    }
  }

  // метод устанавливает слушателей ввода данных, резета
  _setEventListeners() {
    this._toggleButtonState();

    this._formSelector.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });

    this._inputs.forEach((inputSelector) => {
      inputSelector.addEventListener("input", () => {
        this._checkValidityInput(inputSelector);
        this._toggleButtonState();
      });
    });
  }

  // метод включает вадидацию формы
  enableValidation() {
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}
