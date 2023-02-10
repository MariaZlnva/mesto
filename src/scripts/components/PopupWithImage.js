import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image-big");
    this._title = this._popup.querySelector(".popup__title-big");
    
  }

  open(name, link){
    this._title.textContent = name;
    this._image.src = link;
    this._image.alt = link;

    super.open();
  }
}

