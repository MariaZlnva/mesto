import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handlerSubmit){
    super(popupSelector);
    this._handlerSubmit = handlerSubmit;

  }

  _getInputValues(){
    this._inputs = this._popup.querySelectorAll(".popup__input");
    const inputs = Array.from(this._inputs);
    this._formValues = {};
    inputs.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
   
  }

  setEventListeners(){
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handlerSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close(){
    super.close();
    this._popup.querySelector(".popup__form").reset();//очищаем форму при закрытии


  }
}