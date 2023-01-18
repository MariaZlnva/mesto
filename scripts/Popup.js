export default class Popup {
  constructor(popup) {
		this._popup = popup;
  }

	open(){
		this._popup.classList.add("popup_opened");

	}

	close(){
		this._popup.classList.remove("popup_opened");
	}

	_handleEscClose(evt){
		if (evt.key === "Escape") {
			this.close();
	 		// this.close(document.querySelector(".popup_opened"));
		}
	}

	setEventListeners(){
		//доб.слуаштеля клика по крестику
		document.addEventListener("keydown", (evt) => this._handleEscClose(evt));

		//доб. слуш. клика по оверлай
		this._popup.addEventListener("click", (evt) => {
			if (evt.target.classList.contains("popup_opened")){
				this.close(evt.target);
			}; 
		});
	}

}
