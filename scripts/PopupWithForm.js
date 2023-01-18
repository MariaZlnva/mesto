import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popup, handlerSubmit){
    super(popup);
    this._handlerSubmit = handlerSubmit;

  }

  _getInputValues(){
    this._inputs = this._popup.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputs.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener("submit", () => {this._handlerSubmit(this._getInputValues())}
    );
  }

  close(){
    super.close();
    this._popup.reset();


  }
}