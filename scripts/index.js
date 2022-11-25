// popups elements
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddCard = document.querySelector(".popup_add-cards");
const popunElementPicture = document.querySelector(".popup_big-picture");

// popups open buttons
const popupButtonOpenEdit = document.querySelector(".profile__edit");
const popupButtonAddCard = document.querySelector(".profile__add");

// popup close buttons
const popupButtonCloseEdit = popupEditProfile.querySelector(".popup__close");
const popupButtonCloseAdd = popupAddCard.querySelector(".popup__close");

const formElement = popupEditProfile.querySelector(".popup__inputs");

const profileName = document.querySelector(".profile__title");
const profileInfo = document.querySelector(".profile__subtitle");

const nameInput = formElement.querySelector(".popup__input_name");
const infoInput = formElement.querySelector(".popup__input_info");

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


function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.value;
  infoInput.value;

  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;

  popupClose();
  }

formElement.addEventListener("submit", formSubmitHandler);


// обработчики событий открытия popups
popupButtonOpenEdit.addEventListener("click", function() {
  popupOpen(popupEditProfile)
});
popupButtonAddCard.addEventListener("click", function() {
  popupOpen(popupAddCard)
});

// обработчики событий закрытия popups
popupButtonCloseEdit.addEventListener("click", function() {
  popupClose(popupEditProfile)
});
popupButtonCloseAdd.addEventListener("click", function() {
  popupClose(popupAddCard)
});



