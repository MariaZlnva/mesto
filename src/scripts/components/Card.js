// класс создает карточку с текстом и ссылкой на изображение

export default class Card {
  constructor(data, handlerImageCardClick, handlerLikeButton, handlerDeleteButton, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._selector = templateSelector;
    this._handlerImageCardClick = handlerImageCardClick;
    this._handlerLikeButton = handlerLikeButton;
    this._handlerDeleteButton = handlerDeleteButton;
  }
  //{data, handlerImageCardClick, handlerLikeButton, handlerDeleteButton}, templateSelector)
  // constructor(data, handlerImageCardClick, handlerLikeButton, handlerDeleteButton, templateSelector)

  _getTemplate() {
//забираем разметку с html  и клонируем документ
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);

// вернём DOM-элемент карточки
    return cardElement;
  }

  // метод возвращает готовый элемент
  generateCard() { 
    this._element = this._getTemplate(); // записываем разметку в прив.поле_элемент, у др.эл-в появится доступ к ней

    // доб.данные
    this._cardImage = this._element.querySelector(".card__image");
    
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    
    this._setEventListenersCard();
    
    // возвращаем эл-т
    return this._element;
    
  }

  // метод устанавливающий слушатели событий(лайка, корзины, открытия бол.картинки)
  _setEventListenersCard() {
    this._cardLikeButton = this._element.querySelector(".card__like");
    this._cardDeleteButton = this._element.querySelector(".card__delete");
    
    this._cardLikeButton.addEventListener("click", () => {
      this._handlerLikeButton(this._cardLikeButton);// передаем id карты
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handlerDeleteButton(this._element);
    });

    this._cardImage.addEventListener("click", () => {
      this._handlerImageCardClick(this._name, this._link);
    });
  }

  // метод для обраб.like
//   _handlerLikeButton() {
//     this._cardLikeButton.classList.toggle("card_like-active");
//   }

//   // метод для обраб.delete
//   _handlerDeleteButton() {
//     this._cardDeleteButton.closest(".card").remove();
//   }
}



// По поводу внутренностей класса. Внутри вам необходимо создать публичные методы если чувствуете в них необходимость. Как вариант, вы можете создать, например, публичный метод для переопределения данных по всем лайкам текущей карточки. Это нужно для того чтобы после обновления вы могли получить новые данные по карточке, а затем вызвав публичный метод обновить какие-то внутренние свойства экземпляра класса. Также нужно создать приватный метод, который будет отвечать за наложение нужных классов на иконку лайка (логично, что его надо вызывать и при создании карточки, и при обновлении лайков)