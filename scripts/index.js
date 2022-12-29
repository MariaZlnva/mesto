import { initialCards, config } from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddCard = document.querySelector(".popup_add-cards");
const popupPicture = document.querySelector(".popup_big-picture");

const popupEditProfileOpen = document.querySelector(".profile__edit");
const popupAddCardOpen = document.querySelector(".profile__add");

const popupEditProfileClose = popupEditProfile.querySelector(".popup__close");
const popupAddCardClose = popupAddCard.querySelector(".popup__close");
const popupPictureClose = popupPicture.querySelector(".popup__close");

const formEditProfile = popupEditProfile.querySelector(".popup__form");
const formAddCard = popupAddCard.querySelector(".popup__form");
const formInputName = formAddCard.querySelector(".popup__input_title");
const formInputLink = formAddCard.querySelector(".popup__input_link");

const profileName = document.querySelector(".profile__title");
const profileInfo = document.querySelector(".profile__subtitle");

const nameInput = formEditProfile.querySelector(".popup__input_name");
const infoInput = formEditProfile.querySelector(".popup__input_info");

const imagePopupPicture = popupPicture.querySelector(".popup__image-big");
const titlePopupPicture = popupPicture.querySelector(".popup__title-big");

const cardPlace = document.querySelector(".places");

// экземпляры класса валидации для форм
const validFormEditProfile = new FormValidator(config, formEditProfile);
const validFormAddCard = new FormValidator(config, formAddCard);

validFormEditProfile.enableValidation();
validFormAddCard.enableValidation();


// очищаем поля от ошибок
const clearErrorInput = function (popup) {
  const inputsPopup = popup.querySelectorAll(".popup__input");
  inputsPopup.forEach((inputPopup) => {
    const errorInput = popup.querySelector(`#${inputPopup.id}-error`);
    inputPopup.classList.remove("popup__input_type_error");
    errorInput.textContent = "";
    inputPopup.value = "";
  });
};

const openProfilePopup = function () {
  clearErrorInput(popupEditProfile);
  openPopup(popupEditProfile);
  formEditProfile.reset();
  nameInput.value = profileName.textContent;
  infoInput.value = profileInfo.textContent;
};

const openAddCardPopup = function () {
  clearErrorInput(popupAddCard);
  openPopup(popupAddCard);
};

const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", closePopupClickOverlay);
  document.addEventListener("keydown", closePopupClickEsc);
};

const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupClickEsc);
};

const closePopupClickOverlay = function (evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
};

const closePopupClickEsc = function (evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

const handlerImageCardClick = (name, link) => {
  titlePopupPicture.textContent = name;
  imagePopupPicture.src = link;
  imagePopupPicture.alt = name;

  openPopup(popupPicture);
};

function handlerFormSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  closePopup(popupEditProfile);
}

function handlerFormSubmitAddCard(evt) {
  evt.preventDefault();
  const cardElement = {
    name: formInputName.value,
    link: formInputLink.value,
  };
  renderCard(cardElement);
  closePopup(popupAddCard);
  formAddCard.reset();
}

const renderCard = (item) => {
  const card = new Card(item, ".card-template", handlerImageCardClick);
  const elementCard = card.generateCard(item);
  cardPlace.prepend(elementCard);
};

initialCards.forEach((item) => {
  renderCard(item);
});

popupEditProfileOpen.addEventListener("click", function () {
  openProfilePopup();
});

popupAddCardOpen.addEventListener("click", function () {
  openAddCardPopup();
});

popupEditProfileClose.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

popupAddCardClose.addEventListener("click", function () {
  closePopup(popupAddCard);
});

popupPictureClose.addEventListener("click", function () {
  closePopup(popupPicture);
});

formAddCard.addEventListener("submit", handlerFormSubmitAddCard);

formEditProfile.addEventListener("submit", handlerFormSubmitProfile);
