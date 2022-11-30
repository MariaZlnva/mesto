const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddCard = document.querySelector(".popup_add-cards");
const popupPicture = document.querySelector(".popup_big-picture");

const popupEditProfileOpen = document.querySelector(".profile__edit");
const popupAddCardOpen = document.querySelector(".profile__add");

const popupEditProfileClose = popupEditProfile.querySelector(".popup__close");
const popupAddCardClose = popupAddCard.querySelector(".popup__close");
const popupPictureClose = popupPicture.querySelector(".popup__close");

const formEditProfile = popupEditProfile.querySelector(".popup__inputs");
const formAddCard = popupAddCard.querySelector(".popup__inputs");
const formInputName = formAddCard.querySelector(".popup__input_title");
const formInputLink = formAddCard.querySelector(".popup__input_link");

const profileName = document.querySelector(".profile__title");
const profileInfo = document.querySelector(".profile__subtitle");

const nameInput = formEditProfile.querySelector(".popup__input_name");
const infoInput = formEditProfile.querySelector(".popup__input_info");

const imagePopupPicture = popupPicture.querySelector(".popup__image-big");
const titlePopupPicture = popupPicture.querySelector(".popup__title-big");

const cardPlace = document.querySelector(".places");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");


// функция создания элемента 
function createElement (card){
  const cardElement = cardTemplate.cloneNode(true);

  const likeButton = cardElement.querySelector(".places__like");
  const deleteButton = cardElement.querySelector(".places__delete");

  const nameCard = cardElement.querySelector(".places__title");
  const imageCard = cardElement.querySelector(".places__image");
  nameCard.textContent = card.name;
  imageCard.src = card.link;
    
  likeButton.addEventListener('click', handlerLikeButton);
  deleteButton.addEventListener('click', handlerDeleteButton);

  imageCard.addEventListener('click', function() {
    titlePopupPicture.textContent = card.name;
    imagePopupPicture.src = card.link;
    imagePopupPicture.alt = card.name;
    
    openPopup(popupPicture);
    
     });

  return cardElement;
  }
  
const handlerLikeButton = (evt) => {
  evt.target.classList.toggle("places_like-active");
}

const handlerDeleteButton = (evt) => {
  evt.target.closest(".places__item").remove();
}


const renderCard = function(card){
  const element = createElement(card);
  cardPlace.prepend(element);
  }
  
// перебираем массив, в кач-ве аргум функция, которая вызывается на каждый элемент массива
initialCards.forEach(function(card){
  renderCard(card);
  })
  
const openProfilePopup = function () {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  infoInput.value = profileInfo.textContent;
 }


const openPopup = function (popup) {
  popup.classList.add("popup_opened");
   }


const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
}


function handlerFormSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  closePopup(popupEditProfile);
  }


function handlerFormSubmitAddCard (evt) {
  evt.preventDefault(); 
    const cardElement = {
      name: formInputName.value,
      link: formInputLink.value,
    }
    
  renderCard(cardElement);
  closePopup(popupAddCard);
  formAddCard.reset();
 
}

popupEditProfileOpen.addEventListener("click", function() {
  openProfilePopup()
});

popupAddCardOpen.addEventListener("click", function() {
  openPopup(popupAddCard)
});

popupEditProfileClose.addEventListener("click", function() {
  closePopup(popupEditProfile)
});

popupAddCardClose.addEventListener("click", function() {
  closePopup(popupAddCard)
});

popupPictureClose.addEventListener("click", function() {
  closePopup(popupPicture)
});


formAddCard.addEventListener('submit', handlerFormSubmitAddCard); 

formEditProfile.addEventListener("submit", handlerFormSubmitProfile);


