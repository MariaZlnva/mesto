//класс управляет отображением инф.о польз.на странице

export default class UserInfo{
  constructor({userName, userAbout, userAvatar}){
    this._name = userName;
    this._about = userAbout;
    this._avatar = userAvatar;
  }

  getUserInfo(){  
    
    //возвр.объект с данными пользователя, к-рый подставим в форму при открытиии попап
    const infoUserData = {
      nameInput: this._name.textContent,
      aboutInput: this._about.textContent
    }
    
    return infoUserData;
    
  }
  setUserInfo({name, about, avatar, _id}){

    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}