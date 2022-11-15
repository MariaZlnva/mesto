const popupElement = document.querySelector(".popup");
const popupOpenButtonElement = document.querySelector(".profile__edit");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");

const formElement = popupElement.querySelector(".popup__inputs");

const profileName = document.querySelector(".profile__title");
const profileInfo = document.querySelector(".profile__subtitle");

const nameInput = formElement.querySelector(".popup__input_name");
const infoInput = formElement.querySelector(".popup__input_info");


const popupOpen = function () {
  popupElement.classList.add("popup_opened");

  nameInput.value = profileName.textContent;
  infoInput.value = profileInfo.textContent;
}

const popupClose = function () {
  popupElement.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  nameInput.value;
  infoInput.value;

  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;

  popupClose();
}

formElement.addEventListener("submit", formSubmitHandler);

popupOpenButtonElement.addEventListener("click", popupOpen);
popupCloseButtonElement.addEventListener("click", popupClose);
