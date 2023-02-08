import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handlerSubmit){
    super(popupSelector);
    this._handlerSubmit = handlerSubmit;
    this._inputs = this._popup.querySelectorAll(".popup__input");
    this._form = this._popup.querySelector(".popup__form")
    this._button = this._popup.querySelector(".popup__button");
  }

  _getInputValues(){//собирает данные полей формы
    this._formValues = {};
    this._inputs.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
   
  }
  
  setEventListeners(){
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handlerSubmit(this._getInputValues());
    });
    super.setEventListeners(); // вызываем родительский метод
  }

  close(){
    super.close(); // вызываем родительский метод
    this._form.reset();//очищаем форму при закрытии


  }
}