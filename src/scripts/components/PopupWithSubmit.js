import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector){
    super(popupSelector)
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