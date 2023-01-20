export default class Popup {
  constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
  }

	open(){
		this._popup.classList.add("popup_opened");
		document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
	}

	close(){
		this._popup.classList.remove("popup_opened");
		document.removeEventListener("keydown", (evt) => this._handleEscClose(evt));
	}
//обработка нажатия на ESC
	_handleEscClose(evt){
		if (evt.key === "Escape") {
			this.close();
		}
	}

	setEventListeners(){
		//слушатель клика по крестику
		this._popup.querySelector(".popup__close").addEventListener("click", (evt) => this.close());

		//доб. слуш. клика по оверлай
		this._popup.addEventListener("click", (evt) => {
			if (evt.target.classList.contains("popup_opened")){
				this.close(evt.target);
			}; 
		});
	}

}
