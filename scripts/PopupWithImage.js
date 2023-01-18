import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup, name, link) {
    super(popup);
    this._name = name;
    this._link = link;
    
  }

  open(title, image){
    
    title.textContent = this._name;
    image.src = this._link;
    image.alt = this._name; 

    super.open();
  }
}

