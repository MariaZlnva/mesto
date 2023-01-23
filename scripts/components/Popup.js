
export default class Popup {
  constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
		this._handleEscClose = this._handleEscClose.bind(this);
  }

	open(){
		this._popup.classList.add("popup_opened");
		document.addEventListener("keydown", this._handleEscClose);
	}

	close(){
		this._popup.classList.remove("popup_opened");
		document.removeEventListener("keydown", this._handleEscClose);
	}
//обработка нажатия на ESC
	_handleEscClose(evt){
		// console.log(evt.key);
		if (evt.key === "Escape") {
			this.close();
		}
	}

	setEventListeners(){
		//слушатель клика по крестику и по оверлай
		this._popup.addEventListener("mousedown", (evt) => {
			if (
				evt.target.classList.contains("popup_opened") ||
				evt.target.classList.contains("popup__close")
			) {
				this.close(evt.target);
			}
		});

	
	}

}
