import "./index.css";
import { initialCards, config } from "../scripts/constants.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithSubmit from "../scripts/components/PopupWithSubmit.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
import { data } from "autoprefixer";


const btnEditProfile = document.querySelector(".profile__edit");
const btnAddCard = document.querySelector(".profile__add");
const btnAvatar = document.querySelector(".profile__btn-avatar");


const formEditProfile = document.forms.aboutUser;// получим формы через атрибут name
const formAddCard = document.forms.aboutCard;
const formUpdateAvatar = document.forms.imageAvatar;


const nameProfile = document.querySelector(".profile__title");
const infoProfile = document.querySelector(".profile__subtitle");
const avatar = btnAvatar.querySelector(".profile__avatar");

const nameUserInput = formEditProfile.querySelector(".popup__input_name");
const infoUserInput = formEditProfile.querySelector(".popup__input_info");


//ЭКЗЕМПЛЯРЫ КЛАССОВ
const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/",
  headers: {
    authorization: "d9d74726-0f35-4f64-a4f4-3690ec473717",
    "Content-Type": "application/json",
  },
  idGroup: "cohort-59",
});

const userData = new UserInfo({
  userName: nameProfile,
  userAbout: infoProfile,
  userAvatar: avatar,
});

const cardsList = new Section(
  { renderer: renderCard },
  ".places"
);

const popupProfileForm = new PopupWithForm(
  ".popup_edit-profile",
  (dataInput) => {
    popupProfileForm.renderLoading(true);
    api
      .changeProfileData(dataInput) //отправляем данные с инпутов на сервер {about:, name: "", avatar, _id}
      .then((res) => {
        userData.setUserInfo(res);//res {name: 'ma', about: 'da', avatar}
        popupProfileForm.close();
      })
      .catch((err) => console.log("Error change profile data!!!"))
      .finally(() => {
        popupProfileForm.renderLoading(false);
      });
  }
);
const popupAddCardForm = new PopupWithForm(".popup_add-cards", (dataCard) => {
    popupAddCardForm.renderLoading(true);
  api
    .addNewCard(dataCard)
    .then((dataItem) => {
      console.log(dataItem); // {name: ,link: , id: , owner:}
      popupAddCardForm.close();
      renderCard(dataItem);
    })
    .catch((err) => console.log("Error add card!!!"))
    .finally(() => {
      popupAddCardForm.renderLoading(false);
    });
});
const popupChangeAvatar = new PopupWithForm(
  ".popup_update-avatar",
  (dataForm) => {//данные с input
    popupChangeAvatar.renderLoading(true);
    api
      .changeAvatar(dataForm) //отправляем новые данные на сервер
      .then((res) => {
        userData.setUserInfo(res);
        popupChangeAvatar.close();
      })
      .catch((err) => console.log("Error change avatar!!!"))
      .finally(() => {
        popupChangeAvatar.renderLoading(false);
      });
  }
);
const popupWithImageCard = new PopupWithImage(".popup_big-picture");
const popupSubmitDelete = new PopupWithSubmit(".popup_delete-card");
const validFormEditProfile = new FormValidator(config, formEditProfile);
const validFormAddCard = new FormValidator(config, formAddCard);
const validFormAvatar = new FormValidator(config, formUpdateAvatar);

let userId;// созд.переменную , которую позже перезапишем и передадим к кард

api
  .getInitialData()
  .then((arg) => {
    const [infoUserServer, itemsServer] = arg;
    userData.setUserInfo(infoUserServer); // устанав.данные польз на странице 
    //infoUserServer: {name: '', about: '', avatar: '', _id: '', cohort: ''}
    userId = infoUserServer._id; // присваиваем id данного пользователя - его в карточку передаем
    cardsList.renderItems(itemsServer); // отрис.эл-ты массива на страницe
  })

  .then(() => {
    //устанавливаем слушатели попапам
    popupChangeAvatar.setEventListeners();
    popupProfileForm.setEventListeners();
    popupAddCardForm.setEventListeners();
    popupSubmitDelete.setEventListeners();
    popupWithImageCard.setEventListeners();
    //открытие попапов
    btnAvatar.addEventListener("click", function () {
      popupChangeAvatar.open();
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
  .catch((err) => console.log("Error!!!"));

function createCard(dataItem) {
  const card = new Card(
    {
      userId,
      dataItem: {
        name: dataItem.name,
        link: dataItem.link,
        _id: dataItem._id, // id самой карточки
        owner: dataItem.owner, // id создателя карточки
        likes: dataItem.likes,
      },
      handlerImageCardClick: (name, link) => {
        popupWithImageCard.open(name, link);
      },
      handlerLikeButton: (id) => {
        if (card.hasLike()) {
          //если true, то удаляем лайк
          api
            .deleteLike(id)
            .then((updateData) => {
              card.updateLikes(updateData);
              card.isMyLike();
            })
            .catch((err) => console.log("Error delete like !!!"));
        } else {
          api
            .addLike(id)
            .then((updateData) => {
              card.updateLikes(updateData);
              card.isMyLike();
            })
            .catch((err) => console.log("Error add like !!!"));
        }
      },
      handlerDeleteButton: (id) => {
        popupSubmitDelete.open();
        popupSubmitDelete.setSubmitAction(() => {
          popupSubmitDelete.setTextButton("Удаление...");
          api
            .deleteCard(id)
            .then((res) => {
              console.log(res);
              card.deleteCard();
              popupSubmitDelete.close();
            })
            .catch((err) => console.log("Error delete card!!!"))
            .finally(() => {
              popupSubmitDelete.setTextButton("Да");
            });
        });
      },
    },
    ".card-template"
  );
  const elementCard = card.generateCard();
  return elementCard;
}

function renderCard(item) {
  cardsList.addItem(createCard(item));
}
