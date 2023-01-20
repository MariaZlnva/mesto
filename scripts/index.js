import { initialCards, config } from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js"; 


const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddCard = document.querySelector(".popup_add-cards");
const popupPicture = document.querySelector(".popup_big-picture");

const btnEditProfile = document.querySelector(".profile__edit");
const btnAddCard = document.querySelector(".profile__add");

const popupEditProfileClose = popupEditProfile.querySelector(".popup__close");
const popupAddCardClose = popupAddCard.querySelector(".popup__close");
const popupPictureClose = popupPicture.querySelector(".popup__close");

const popups = document.querySelectorAll(".popup");

const formEditProfile = popupEditProfile.querySelector(".popup__form");
const formAddCard = popupAddCard.querySelector(".popup__form");
const titleCardInput = formAddCard.querySelector(".popup__input_title");
const linkCardInput = formAddCard.querySelector(".popup__input_link");

const nameProfile = document.querySelector(".profile__title");
const infoProfile = document.querySelector(".profile__subtitle");

const nameUserInput = formEditProfile.querySelector(".popup__input_name");
const infoUserInput = formEditProfile.querySelector(".popup__input_info");

const imagePopupPicture = popupPicture.querySelector(".popup__image-big");
const titlePopupPicture = popupPicture.querySelector(".popup__title-big");

const cardPlace = document.querySelector(".places");

// экземпляры классов

const validFormEditProfile = new FormValidator(config, formEditProfile);
const validFormAddCard = new FormValidator(config, formAddCard);

const popupProfileForm = new PopupWithForm(".popup_edit-profile", handlerFormSubmitProfile);
const popupAddCardForm = new PopupWithForm(".popup_add-cards", handlerFormSubmitAddCard);


validFormEditProfile.enableValidation();
validFormAddCard.enableValidation();


const userData = new UserInfo({userName: nameProfile, userAbout: infoProfile});


//обработчик клика по кнопке Редактировать профиль
const handlerClickBtnEditProfile = function () {
//   validFormEditProfile.resetValidation();
//   openPopup(popupEditProfile);
//   formEditProfile.reset();
//   nameUserInput.value = profileName.textContent;
//   infoInput.value = profileInfo.textContent;!!!!!!!!!!!!!!!!
// 
  popupProfileForm.open();
  popupProfileForm.setEventListeners();
  validFormEditProfile.resetValidation();

  const user = userData.getUserInfo();
  nameUserInput.value = user.nameInput;
  infoUserInput.value = user.aboutInput;
 
  // nameUserInput.value = nameProfile.textContent;
  // infoUserInput.value = infoProfile.textContent;
  
};

//обработчик клика по кнопке Добавить карточку
const handlerClickBtnAddCard = function () {
    validFormAddCard.resetValidation();
    formAddCard.reset();
    popupAddCardForm.open();
    popupAddCardForm.setEventListeners();
  };

//обработчик клика по картинке
const handlerImageCardClick = (name, link) => {
  const popupWithImageCard = new PopupWithImage(".popup_big-picture", name, link);
  // titlePopupPicture.textContent = name;
  // imagePopupPicture.src = link;
  // imagePopupPicture.alt = name;

  // openPopup(popupPicture);
  popupWithImageCard.open(titlePopupPicture, imagePopupPicture);
  popupWithImageCard.setEventListeners();
};

//обработчик клика по кнопке Сохранить Данные профиля
function handlerFormSubmitProfile(dataForm) {

  userData.setUserInfo(dataForm);
  
  popupProfileForm.close();
}

//обработчик клика по кнопке Создать новую картинку
function handlerFormSubmitAddCard() {
  // evt.preventDefault();
  // const cardElement = {
  //   name: titleCardInput.value,
  //   link: linkCardInput.value,
  // };
  // renderCard(cardElement);
  // closePopup(popupAddCard);
  // formAddCard.reset();
    popupAddCardForm.close();
    

}


//экз.класса для отрисовки эл-в на странице
const cardsList = new Section ({
  items: initialCards, 
  renderer: (item) => {
    const card = new Card(item, ".card-template", handlerImageCardClick);
    const elementCard = card.generateCard();
    cardsList.addItem(elementCard);
  }
}, ".places");
cardsList.renderItems();



btnEditProfile.addEventListener("click", function () {
  handlerClickBtnEditProfile();
  
});

btnAddCard.addEventListener("click", function () {
  handlerClickBtnAddCard();
});

// popupEditProfileClose.addEventListener("click", function () {
//   closePopup(popupEditProfile);
// });

// popupAddCardClose.addEventListener("click", function () {
//   closePopup(popupAddCard);
// });

// popupPictureClose.addEventListener("click", function () {
//   closePopup(popupPicture);
// });

// formAddCard.addEventListener("submit", handlerFormSubmitAddCard);

// formEditProfile.addEventListener("submit", handlerFormSubmitProfile);





// const renderCard = (item) => {
//   cardPlace.prepend(createCard(item));
// };

// перебираем массив и для каждого эл-та создаем карточку и добавляем в разметку
// initialCards.forEach((item) => {
//   createCard(item);
//   renderCard(item);
// });

// создает карточку с данными и слушателями
// function createCard(item) {
//   const card = new Card(item, ".card-template", handlerImageCardClick);
//   const elementCard = card.generateCard(item);
//   return elementCard;
// }


// const openAddCardPopup = function () {
//   validFormAddCard.resetValidation();
//   formAddCard.reset();
//   openPopup(popupAddCard);
// };

// const openPopup = function (popup) {
//   popup.classList.add("popup_opened");
//   popup.addEventListener("click", closePopupClickOverlay); 
//   document.addEventListener("keydown", closePopupClickEsc); 
// };

// const closePopup = function (popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closePopupClickEsc);
//   popup.removeEventListener("click", closePopupClickOverlay); 
// };


// const closePopupClickOverlay = function (evt) {
//   if (evt.target.classList.contains("popup_opened")) {
//     closePopup(evt.target);
//   }
// };

// const closePopupClickEsc = function (evt) {
//   if (evt.key === "Escape") {
//     closePopup(document.querySelector(".popup_opened"));
//   }
// };