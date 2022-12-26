export default class FormValidator {
  constructor(config, formSelector){
    this._formSelector = formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

  }

  _checkValidityInput() {
    if (this._inputSelector.validity.valid) {
      this._hideError();
    } else {
      this._showError();
    }
  };
  _hideError() {
    this._inputSelector.classList.remove(this._inputErrorClass);
    document.querySelector(`#${this._inputSelector.id}-error`).classList.remove(this._errorClass);
    document.querySelector(`#${this._inputSelector.id}-error`).textContent = "";
  }
  _showError() {
    this._inputSelector.classList.add(this._inputErrorClass);
    document.querySelector(`#${this._inputSelector.id}-error`).classList.add(this._errorClass);
    document.querySelector(`#${this._inputSelector.id}-error`).textContent = this._inputSelector.validationMessage;
  };

  
  _isValidForm () {
    return Array.from(this._formSelector.querySelectorAll(this._inputSelector)).every(() => {
      return this._inputSelector.validity.valid;
    });
  };
  
  _toggleButtonState() {
    if (this._isValidForm()) {
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = false;
    } else {
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = true;
    }
  };

  _setEventListeners () {
    // const inputs = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    // const buttonSubmit = this._formSelector.querySelector(this._submitButtonSelector);
    
    this._toggleButtonState();
    this._formSelector.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });

    Array.from(this._formSelector.querySelectorAll(this._inputSelector)).forEach(() => {
      this._inputSelector.addEventListener("input", () => {
        this._checkValidityInput();
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
      
    Array.from(document.querySelectorAll(this._formSelector)).forEach(() => {
      this._formSelector.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
  
      this._setEventListeners();
    });

  }

}



