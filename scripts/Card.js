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

    this._setEventListenersCard();
    // возвращаем эл-т
    return this._element;
  }

  // метод устанавливающий слушатели событий(лайка, корзины, открытия бол.картинки)
  _setEventListenersCard() {
    this._element.querySelector(".card__like").addEventListener("click", () => {
      this._handlerLikeButton();
    });

    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._handlerDeleteButton();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlerImageCardClick(this._name, this._link);
      });
  }

  // метод для обраб.like
  _handlerLikeButton() {
    this._element
      .querySelector(".card__like")
      .classList.toggle("card_like-active");
  }

  // метод для обраб.delete
  _handlerDeleteButton() {
    this._element.querySelector(".card__delete").closest(".card").remove();
  }
}
