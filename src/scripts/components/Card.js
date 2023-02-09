// класс создает карточку с текстом и ссылкой на изображение

export default class Card {
  constructor({userId, dataItem, handlerImageCardClick, handlerLikeButton, handlerDeleteButton}, templateSelector) {
    this._userId = userId;
    this._name = dataItem.name;
    this._link = dataItem.link;
    this._id = dataItem._id;
    this._ownerId = dataItem.owner._id;
    this._likes = dataItem.likes;
    this._selector = templateSelector;
    this._handlerImageCardClick = handlerImageCardClick;
    this._handlerLikeButton = handlerLikeButton;
    this._handlerDeleteButton = handlerDeleteButton;

  }

  _isOwner(){
    if (this._ownerId === this._userId) {
      return this._element;
      } else {
        this._element.querySelector(".card__delete").remove();
        return this._element;
      }

  }
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
    this._element.querySelector(".card__calcul-like").textContent = this._likes.length;
    this._setEventListenersCard();

    this._isOwner();
    this.isMyLike();
    return this._element;
   
  }

  // метод устанавливающий слушатели событий(лайка, корзины, открытия бол.картинки)
  _setEventListenersCard() {
    this._cardLikeButton = this._element.querySelector(".card__like");
    this._cardDeleteButton = this._element.querySelector(".card__delete");
    
    this._cardLikeButton.addEventListener("click", () => {
      this._handlerLikeButton(this._id);// передаем id карты
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handlerDeleteButton(this._id);
    });

    this._cardImage.addEventListener("click", () => {
      this._handlerImageCardClick(this._name, this._link);
    });
  }

  // метод проверяет есть ли лайк usera
  hasLike(){
    return this._likes.some((like) => like._id === this._userId);
   }

   // актив.или дезактив. кнопку лайка
  isMyLike(){
    if (this.hasLike()) {
      this._activateLike()
    } else {
      this._disableLike()
      
    }
    return this._element;
  }


  _disableLike(){
    this._cardLikeButton.classList.remove("card_like-active");
  }
  _activateLike(){
    this._cardLikeButton.classList.toggle("card_like-active");
  }

// перезаписываем данные по лайкам
  updateLikes(updateData){
    this._likes = updateData.likes;
    this._element.querySelector(".card__calcul-like").textContent = this._likes.length;
  }

  // метод удаляет карточку
  deleteCard() {
    this._cardDeleteButton.closest(".card").remove();
  }


 
}

  


  // toggleLike(){
  //   if (this._hasLike()){
  //     this._cardLikeButton.classList.remove("card_like-active");
  //   } else {
  //     this._cardLikeButton.classList.add("card_like-active");
  //   }
  //   // this._cardLikeButton.classList.toggle("card_like-active");
  // }