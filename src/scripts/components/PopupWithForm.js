import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handlerSubmit){
    super(popupSelector);
    this._handlerSubmit = handlerSubmit;
    this._inputs = this._popup.querySelectorAll(".popup__input");
    this._form = this._popup.querySelector(".popup__form")
    this._buttonText = this._button.textContent;//начальный текст кнопки зафиксировали
  }

  _getInputValues(){//собирает данные полей формы
    this._formValues = {};
    this._inputs.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
   
  }
  
  setEventListeners(){
    super.setEventListeners(); // вызываем родительский метод
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handlerSubmit(this._getInputValues());
    });
  }

  close(){
    super.close(); // вызываем родительский метод
    this._form.reset();//очищаем форму при закрытии
  }

  renderLoading(isLoading, loadingText = "Сохранение..."){
    if(isLoading) {
      this._button.textContent = loadingText;
    } else {
      this._button.textContent = this._buttonText;
    }
  } 

}