import '../pages/index.css';
import { initialCards, config } from "./constants.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithSubmit from "./components/PopupWithSubmit.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api.js";
import { data } from 'autoprefixer';

const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddCard = document.querySelector(".popup_add-cards");
const popupPicture = document.querySelector(".popup_big-picture");
const popupDeleteCard = document.querySelector(".popup_delete-card");
const popupUpdateAvatar = document.querySelector(".popup_update-avatar");

const btnEditProfile = document.querySelector(".profile__edit");
const btnAddCard = document.querySelector(".profile__add");
const btnAvatar = document.querySelector(".profile__btn-avatar");
const avatar = btnAvatar.querySelector(".profile__avatar");


const formEditProfile = popupEditProfile.querySelector(".popup__form");
const formAddCard = popupAddCard.querySelector(".popup__form");
const formUpdateAvatar = popupUpdateAvatar.querySelector(".popup__form");
const titleCardInput = formAddCard.querySelector(".popup__input_title");
const linkCardInput = formAddCard.querySelector(".popup__input_link");

const nameProfile = document.querySelector(".profile__title");
const infoProfile = document.querySelector(".profile__subtitle");

const urlAvatarInput = formUpdateAvatar.querySelector(".popup__input_link");

const nameUserInput = formEditProfile.querySelector(".popup__input_name");
const infoUserInput = formEditProfile.querySelector(".popup__input_info");

const imagePopupPicture = popupPicture.querySelector(".popup__image-big");
const titlePopupPicture = popupPicture.querySelector(".popup__title-big");


const api = new Api ({
  baseUrl: "https://nomoreparties.co/v1/",
  headers: {authorization: 'd9d74726-0f35-4f64-a4f4-3690ec473717', 'Content-Type': 'application/json'},
  idGroup: 'cohort-59'
})

//экз.класса данные юзера
const userData = new UserInfo({userName: nameProfile, userAbout: infoProfile, userAvatar: avatar});

api.getInitialData()
  .then((arg) => {
    const [infoUserServer, itemsServer] = arg;
    userData.setUserInfo({nameUser:infoUserServer.name, aboutUser:infoUserServer.about});// устанав.данные польз на странице
    userData.setAvatar(infoUserServer.avatar);// устанав.аватар
    userData.id = infoUserServer._id; // присваиваем id данного пользователя

    cardsList.renderItems(itemsServer); // отрис.эл-ты массива на страницe

//экз.класса - форма для изменения аватара
    const popupChangeAvatar = new PopupWithForm(".popup_update-avatar", (dataForm) => {
      api.changeAvatar(dataForm)//
        .then(() => {
          avatar.src = dataForm.avatarUrl;
          popupChangeAvatar.close();
          
        })// Внутри handleFormSubmit этого попапа должна лежать логика вызова метода API, который примет новый адрес, отправит на сервер, дождется ответа. Перед зпросом не забудьте запустить прелодер, то есть как-то отобразить в интерфейсе что запрос ушел и в данный момент ожидается его ответ (в ТЗ тоже об этом сказано). После ответа сервера (если он ок), вам надо заменить картинку на фронте и отключить прелодер, а затем закрыть попап
    });
    popupChangeAvatar.setEventListeners();
//обраб.клика по аватар
    btnAvatar.addEventListener("click", function () {
      popupChangeAvatar.open();
      urlAvatarInput.value = avatar.src;  
      validFormAvatar.resetValidation();
    })

// экз.класса - форма редак.профиля
    const popupProfileForm = new PopupWithForm(".popup_edit-profile", (dataForm) => {
      api.changeProfileData(dataForm)
        .then(() => { 
          userData.setUserInfo(dataForm);
          popupProfileForm.close();
        }) 
    })
    popupProfileForm.setEventListeners();

//обраб.клика по кнопке открытия попап-редактирвоания профиля
    btnEditProfile.addEventListener("click", function () {
      popupProfileForm.open();

      const user = userData.getUserInfo();
      nameUserInput.value = user.nameInput;
      infoUserInput.value = user.aboutInput;

      validFormEditProfile.resetValidation();
    });
    
// экз.класса - форма доб.карточки
    const popupAddCardForm = new PopupWithForm(".popup_add-cards", (dataCard) => {
      api.addNewCard(dataCard) 
        .then(() => {
          popupAddCardForm.close();
          const data = {
            name: dataCard.cardName,
            link: dataCard.cardUrl,
          };
          renderCard(data);
        })
    });
    popupAddCardForm.setEventListeners();
//обраб.клика по кнопке открытия попап-добавления карточек
    btnAddCard.addEventListener("click", function () {
      validFormAddCard.resetValidation();
      popupAddCardForm.open();
    });

  })
  .catch(()=> console.log('error'))

  
  
  


//экз.класса для отрисовки массива эл-в на странице
const cardsList = new Section(
  {renderer: (item) => renderCard(item)},
  ".places"
)

//созд.отд.карточку
function createCard(item) {
  const card = new Card(item, ".card-template", (name, link) =>
  handlerImageCardClick(name, link)
);
 const elementCard = card.generateCard();
 return elementCard 
}

function renderCard(item) {
  cardsList.addItem(createCard(item));
}

const validFormEditProfile = new FormValidator(config, formEditProfile);
validFormEditProfile.enableValidation();

const validFormAddCard = new FormValidator(config, formAddCard);
validFormAddCard.enableValidation();

const validFormAvatar = new FormValidator(config, formUpdateAvatar);
validFormAvatar.enableValidation();


//экз.класса для отрисовки массива эл-в на странице
// const cardsList = new Section(
//   { items: initialCards, renderer: (item) => renderCard(item) },
//   ".places"
// );
//отрис.эл-ты массива на страницу
// cardsList.renderItems();









//экз.класса попап биг картинка
const popupWithImageCard = new PopupWithImage(".popup_big-picture");
popupWithImageCard.setEventListeners();




//экз.класса попап с подтвеждения
const popupSubmitDelete = new PopupWithSubmit(".popup_delete-card");
// popupSubmitDelete.setEventListeners();



//ОБРАБОТЧИКИ КЛИКОВ 

//обраб.клика по фото
const handlerImageCardClick = (name, link) => {
  popupWithImageCard.open(name, link);
};







