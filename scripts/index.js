const initialCards = [
    {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

// popups elements
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddCard = document.querySelector(".popup_add-cards");
const popunPicture = document.querySelector(".popup_big-picture");

// popups open buttons
const popupButtonOpenEdit = document.querySelector(".profile__edit");
const popupButtonAddCard = document.querySelector(".profile__add");
const popupClickImage = document.querySelector(".popup__image-big");

// popup close buttons
const popupButtonCloseEdit = popupEditProfile.querySelector(".popup__close");
const popupButtonCloseAdd = popupAddCard.querySelector(".popup__close");
const popupButtonCloseImage = popunPicture.querySelector(".popup__close");


const formEditProfile = popupEditProfile.querySelector(".popup__inputs");
const formAddCard = popupAddCard.querySelector(".popup__inputs");
const formInputName = formAddCard.querySelector(".popup__input_title");
const formInputLink = formAddCard.querySelector(".popup__input_link");

const profileName = document.querySelector(".profile__title");
const profileInfo = document.querySelector(".profile__subtitle");

const nameInput = formEditProfile.querySelector(".popup__input_name");
const infoInput = formEditProfile.querySelector(".popup__input_info");

const cardPlace = document.querySelector(".places");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");



// функция создания элемента (у функции одно действие должно быть - здесь только создание)
function createElement (card){
  const cardElement = cardTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector(".places__like");
  const deleteButton = cardElement.querySelector(".places__delete");
  const cardName = cardElement.querySelector(".places__title");
  const cardImage = cardElement.querySelector(".places__image");
  cardName.textContent = card.name;
  cardImage.src = card.link;
    
  likeButton.addEventListener('click', handlerLikeButton);
  deleteButton.addEventListener('click', handlerDeleteButton);
  popupClickImage.addEventListener('click', handlerImageClick);

  return cardElement;

  console.log(cardElement.content);
  }
  

// функция обработчик like
const handlerLikeButton = (evt) => {
  evt.target.classList.toggle("places_like-active");
}

// функция обработчик delete
const handlerDeleteButton = (evt) => {
  evt.target.closest(".places__item").remove();
}

const handlerImageClick = (evt) => {
  // в изображение попап подставляем src и alt на которые кликнули и открываем попап
  popupClickImage.value = card.link.content;
  console.log(popupClickImage);
  popupOpen(popunPicture);
}

// функция которая получает в кач-ве аргумента card, создает карточку и помещает в верстку
const renderCard = function(card){
  const element = createElement(card);
  cardPlace.prepend(element);
  }

// перебираем массив, в кач-ве аргум функция, которая вызывается на каждый элемент массива
initialCards.forEach(function(card){
  renderCard(card);
  })

// function open popup
const popupOpen = function (evt) {
  evt.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  infoInput.value = profileInfo.textContent;
}

// закрываем попап
const popupClose = function (evt) {
  evt.classList.remove("popup_opened");
}

// функция сохранения введенных данных профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.value;
  infoInput.value;
  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  popupClose(popupEditProfile);
  }



// функция обработчик события формы добавления карточки
function handlerFormSubmit (evt) {
  evt.preventDefault(); 
    const cardElement = {
      name: formInputName.value,
      link: formInputLink.value,
    }
  renderCard(cardElement);
  popupClose(popupAddCard);
}





// функции слушатели событий открытия/закрытия попапов
popupButtonOpenEdit.addEventListener("click", function() {
  popupOpen(popupEditProfile)
});
popupButtonAddCard.addEventListener("click", function() {
  popupOpen(popupAddCard)
});

popupButtonCloseEdit.addEventListener("click", function() {
  popupClose(popupEditProfile)
});
popupButtonCloseAdd.addEventListener("click", function() {
  popupClose(popupAddCard)
});




formAddCard.addEventListener('submit', handlerFormSubmit); 

formEditProfile.addEventListener("submit", formSubmitHandler);


