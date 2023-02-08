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

//ЭКЗЕМПЛЯРЫ КЛАССОВ
const api = new Api ({
  baseUrl: "https://nomoreparties.co/v1/",
  headers: {authorization: 'd9d74726-0f35-4f64-a4f4-3690ec473717', 'Content-Type': 'application/json'},
  idGroup: 'cohort-59'
})

const userData = new UserInfo({userName: nameProfile, userAbout: infoProfile, userAvatar: avatar});
const cardsList = new Section({renderer: (item) => renderCard(item)},".places");
const popupProfileForm = new PopupWithForm(".popup_edit-profile", (dataForm) => {
  popupProfileForm.setTextButton('Сохранение...')
  api.changeProfileData(dataForm)//отправляем данные с инпутов на сервер
    .then(() => { 
      userData.setUserInfo(dataForm);
      popupProfileForm.close();
    })
    .catch((err) => console.log('Error!!!'))
    .finally(()=>{
      popupProfileForm.setTextButton('Сохранить')
    })
});
const popupAddCardForm = new PopupWithForm(".popup_add-cards", (dataCard) => {
  popupAddCardForm.setTextButton('Сохранение...');
  api.addNewCard(dataCard) 
    .then((dataItem) => {
      console.log(dataItem)// {name: ,link: , id: , owner:}
      popupAddCardForm.close();
      // const data = {
      //   name: dataItem.name,//записали в name link  то что пришло с сервера
      //   link: dataItem.link,
      // };
      renderCard(dataItem);
    })
    .catch((err) => console.log('Error!!!'))
    .finally(()=>{
      popupAddCardForm.setTextButton('Сохранить')
    })
});
const popupChangeAvatar = new PopupWithForm(".popup_update-avatar", (dataForm) => {
  popupChangeAvatar.setTextButton('Сохранение...')
  api.changeAvatar(dataForm)//отправляем новые данные на сервер
    .then(() => {
      avatar.src = dataForm.avatarUrl;
      popupChangeAvatar.close();
    })
    .catch((err) => console.log('Error!!!'))
    .finally(()=>{
      popupChangeAvatar.setTextButton('Сохранить')
    })
});
const popupWithImageCard = new PopupWithImage(".popup_big-picture");
const popupSubmitDelete = new PopupWithSubmit(".popup_delete-card");
const validFormEditProfile = new FormValidator(config, formEditProfile);
const validFormAddCard = new FormValidator(config, formAddCard);
const validFormAvatar = new FormValidator(config, formUpdateAvatar);

let userId;

api.getInitialData()
  // .then(res => {console.log('res =>', res)})
  .then((arg) => {
    const [infoUserServer, itemsServer] = arg;
    userData.setUserInfo({nameUser:infoUserServer.name, aboutUser:infoUserServer.about});// устанав.данные польз на странице
    userData.setAvatar(infoUserServer.avatar);// устанав.аватар
    userId = infoUserServer._id; // присваиваем id данного пользователя 8883c346bad605f52f68e809 - его в карточку передаем
    cardsList.renderItems(itemsServer); // отрис.эл-ты массива на страницe
  })
  
  .then(() => {
    //устанавливаем слушатели попапам
    popupChangeAvatar.setEventListeners();
    popupProfileForm.setEventListeners();
    popupAddCardForm.setEventListeners();
    popupSubmitDelete.setEventListeners();
    popupWithImageCard.setEventListeners()
    //открытие попапов
    btnAvatar.addEventListener("click", function () {
      popupChangeAvatar.open();
      urlAvatarInput.value = avatar.src;  
      validFormAvatar.resetValidation();
    });

    btnEditProfile.addEventListener("click", function () {
      popupProfileForm.open();
      const user = userData.getUserInfo();
        nameUserInput.value = user.nameInput;
        infoUserInput.value = user.aboutInput;
      validFormEditProfile.resetValidation();
    });

    btnAddCard.addEventListener("click", function () {
      validFormAddCard.resetValidation();
      popupAddCardForm.open();
    });
    
    //вкл. валидацию форм
    validFormEditProfile.enableValidation();
    validFormAddCard.enableValidation();
    validFormAvatar.enableValidation();

  })
  .catch((err) => console.log('Error!!!'))


function createCard(dataItem) {//{name: ,link: , _id: , owner:, likes: []}
  const card = new Card({
    userId,
    dataItem: {
      name: dataItem.name, 
      link: dataItem.link,
      _id: dataItem._id, // id самой карточки 
      owner: dataItem.owner, // id создателя карточки 
      likes: dataItem.likes
    },
    handlerImageCardClick: (name, link) => { 
      popupWithImageCard.open(name, link) 
    },
    handlerLikeButton: (id) => {
      if (card.hasLike()){ //если true, то удаляем лайк
          api.deleteLike(id)
            .then((updateData) => {
              card.updateLikes(updateData);
              // card.toggleLike();
              card.disableLike();
            })
            .catch((err) => console.log('Error delete like !!!'))
        } else {
            api.addLike(id)
            .then((updateData) => {
              card.updateLikes(updateData);
              card.activateLike();
            })
            .catch((err) => console.log('Error add like !!!'))
        }    
    },
    handlerDeleteButton: (id) => {
      popupSubmitDelete.open(
        (() => {
          api.deleteCard(id)
            .then((res) => {
              console.log(res);
              card.deleteCard(id);
              popupSubmitDelete.close();
            })
        })
      );

    }
  }, ".card-template"
  );
    const elementCard = card.generateCard();
    return elementCard 
}

function renderCard(item) {
  cardsList.addItem(createCard(item));
}

// function handlerSubmitConfirm(evt){
//   evt.preventDefault();
//   api.deleteCard(dataItem._id)
//     .then((res) => {
//         console.log(res)
//         card.deleteCard();
//   })
//     .catch(() => console.log('ОШИБКА удаления карточки'))
// }












