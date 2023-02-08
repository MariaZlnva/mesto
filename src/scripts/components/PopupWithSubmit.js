import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector){
    super(popupSelector)
    this._button = this._popup.querySelector(".popup__button");
  }
  open(handler){
    super.open();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      handler();
    });
  }
  setEventListeners(){
    super.setEventListeners();


  }
  
}