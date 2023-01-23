import { initialCards, config } from "./constants.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";

const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddCard = document.querySelector(".popup_add-cards");
const popupPicture = document.querySelector(".popup_big-picture");

const btnEditProfile = document.querySelector(".profile__edit");
const btnAddCard = document.querySelector(".profile__add");

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


// экземпляры классов

const validFormEditProfile = new FormValidator(config, formEditProfile);
validFormEditProfile.enableValidation();

const validFormAddCard = new FormValidator(config, formAddCard);
validFormAddCard.enableValidation();

//экз.класса для отрисовки массива эл-в на странице
const cardsList = new Section(
  { items: initialCards, renderer: (item) => renderCard(item) },
  ".places"
);
//отрис.эл-ты массива на страницу
cardsList.renderItems();

// форма редак.профиля
const popupProfileForm = new PopupWithForm(
  ".popup_edit-profile",
  (dataForm) => {
    userData.setUserInfo(dataForm);
    popupProfileForm.close();
  }
);

popupProfileForm.setEventListeners();

// форма доб.карточки
const popupAddCardForm = new PopupWithForm(".popup_add-cards", (dataCard) => {
  popupAddCardForm.close();

  const data = {
    name: dataCard.cardName,
    link: dataCard.cardUrl,
  };
  renderCard(data);
});

popupAddCardForm.setEventListeners();

const userData = new UserInfo({
  userName: nameProfile,
  userAbout: infoProfile,
});

//созд.отд.карточку
function renderCard(item) {
  const card = new Card(item, ".card-template", () =>
    handlerImageCardClick(item)
  );
  const elementCard = card.generateCard();
  cardsList.addItem(elementCard);
}

//обраб.клика по фото
const handlerImageCardClick = (name, link) => {
  const popupWithImageCard = new PopupWithImage(
    ".popup_big-picture",
    name,
    link
  );
  popupWithImageCard.open(titlePopupPicture, imagePopupPicture);
  popupWithImageCard.setEventListeners();
};

//обраб.клика по кнопке открытия попап-редактирвоания профиля
btnEditProfile.addEventListener("click", function () {
  popupProfileForm.open();

  const user = userData.getUserInfo();
  nameUserInput.value = user.nameInput;
  infoUserInput.value = user.aboutInput;

  validFormEditProfile.resetValidation();
});

//обраб.клика по кнопке открытия попап-добавления карточек
btnAddCard.addEventListener("click", function () {
  validFormAddCard.resetValidation();
  popupAddCardForm.open();
});

