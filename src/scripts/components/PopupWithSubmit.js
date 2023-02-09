import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector){
    super(popupSelector)
    this._button = this._popup.querySelector(".popup__button");
  }


  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
  }

  setSubmitAction(action){ // метод устанавливает обработчик событий
    this._handleSubmitCallback = action;
  
  }
}