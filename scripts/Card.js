// класс создает карточку с текстом и ссылкой на изображение

export default class Card {
  constructor(data, templateSelector, handlerImageCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = templateSelector;
    this._handlerImageCardClick = handlerImageCardClick;
  }
  // методы которые работают с разметкой, устанавливают слушателей событий

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }
  // метод возвращает готовый элемент
  generateCard() {
    // записываем разметку в прив.поле_элемент, у др.эл-в появится доступ к ней
    this._element = this._getTemplate();

    // доб.данные элемента
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    
    this._setEventListenersCard();
    // возвращаем эл-т
    return this._element;
    
  }

  // метод устанавливающий слушатели событий(лайка, корзины, открытия бол.картинки)
  _setEventListenersCard() {
    this._cardLikeButton = this._element.querySelector(".card__like");
    this._cardDeleteButton = this._element.querySelector(".card__delete");
    this._cardImage = this._element.querySelector(".card__image");

    this._cardLikeButton.addEventListener("click", () => {
      this._handlerLikeButton();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handlerDeleteButton();
    });

    this._cardImage.addEventListener("click", () => {
      this._handlerImageCardClick(this._name, this._link);
    });
  }

  // метод для обраб.like
  _handlerLikeButton() {
    this._cardLikeButton.classList.toggle("card_like-active");
  }

  // метод для обраб.delete
  _handlerDeleteButton() {
    this._cardDeleteButton.closest(".card").remove();
  }
}
