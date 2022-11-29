// popups elements
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddCard = document.querySelector(".popup_add-cards");
const popupPicture = document.querySelector(".popup_big-picture");

// popups open buttons
const popupButtonOpenEdit = document.querySelector(".profile__edit");
const popupButtonAddCard = document.querySelector(".profile__add");
const popupOpenBigPicture = document.querySelector(".places__image");

// popup close buttons
const popupButtonCloseEdit = popupEditProfile.querySelector(".popup__close");
const popupButtonCloseAdd = popupAddCard.querySelector(".popup__close");
const popupButtonCloseImage = popupPicture.querySelector(".popup__close");

const formEditProfile = popupEditProfile.querySelector(".popup__inputs");
const formAddCard = popupAddCard.querySelector(".popup__inputs");
const formInputName = formAddCard.querySelector(".popup__input_title");
const formInputLink = formAddCard.querySelector(".popup__input_link");

const profileName = document.querySelector(".profile__title");
const profileInfo = document.querySelector(".profile__subtitle");

const nameInput = formEditProfile.querySelector(".popup__input_name");
const infoInput = formEditProfile.querySelector(".popup__input_info");

const imageBigPopup = popupPicture.querySelector(".popup__image-big");
const titleBigPopup = popupPicture.querySelector(".popup__title-big");

const cardPlace = document.querySelector(".places");
const titleCardPlace = cardPlace.querySelector(".places__title");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");



// функция создания элемента 
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
  cardImage.addEventListener('click', function() {
    titleBigPopup.textContent = card.name;
    imageBigPopup.src = card.link;
    imageBigPopup.alt = card.name;
    
    openPopup(popupPicture);
    
     });

  return cardElement;
  }
  
  
// функция обработчик like
const handlerLikeButton = (evt) => {
  evt.target.classList.toggle("places_like-active");
}

// функция обработчик delete
const handlerDeleteButton = (evt) => {
  evt.target.closest(".places__item").remove();
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

  const openProfilePopup = function (evt) {
    evt.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    infoInput.value = profileInfo.textContent;
   }


const openPopup = function (evt) {
  evt.classList.add("popup_opened");
   }


const closePopup = function (evt) {
  evt.classList.remove("popup_opened");
}

// функция сохранения введенных данных профиля
function handlerFormSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  closePopup(popupEditProfile);
  }



// функция обработчик события формы добавления карточки
function handlerFormSubmitAddCard (evt) {
  evt.preventDefault(); 
    const cardElement = {
      name: formInputName.value,
      link: formInputLink.value,
    }
  renderCard(cardElement);
  closePopup(popupAddCard);
}



// функции слушатели событий открытия/закрытия попапов
popupButtonOpenEdit.addEventListener("click", function() {
  openProfilePopup(popupEditProfile)
});
popupButtonAddCard.addEventListener("click", function() {
  openPopup(popupAddCard)
});

popupButtonCloseEdit.addEventListener("click", function() {
  closePopup(popupEditProfile)
});
popupButtonCloseAdd.addEventListener("click", function() {
  closePopup(popupAddCard)
});

popupButtonCloseImage.addEventListener("click", function() {
  closePopup(popupPicture)
});




formAddCard.addEventListener('submit', handlerFormSubmitAddCard); 

formEditProfile.addEventListener("submit", handlerFormSubmitProfile);


