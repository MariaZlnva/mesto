

export default class UserInfo{
  constructor({userName, userAbout}){
    this._name = userName;
    this._about = userAbout;
  }

  getUserInfo(){  
    
    //возвр.объект с данными пользователя, к-рый подставим в форму при открытиии попап
    const infoUserData = {
      nameInput: this._name.textContent,
      aboutInput: this._about.textContent
    }
    
    return infoUserData;
    
  }
  setUserInfo({nameInput, aboutInput}){
    this._name.textContent = nameInput.value;
    this._about.textContent = aboutInput.value;
  }
}