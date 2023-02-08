export default class Api {
  constructor({baseUrl, headers, idGroup}){
    this._baseUrl = baseUrl, 
    this._headers = headers,
    this._idGroup = idGroup
  }

  getInfoUserServer(){
    return fetch (`${this._baseUrl}${this._idGroup}/users/me`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  
  }

  getItemsServer(){
    return fetch (`${this._baseUrl}${this._idGroup}/cards`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getInitialData(){
    return Promise.all([this.getInfoUserServer(), this.getItemsServer()])
  }

  changeProfileData(dataForm) { 
    return fetch(`${this._baseUrl}${this._idGroup}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: dataForm.nameUser,
        about: dataForm.aboutUser
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  changeAvatar(dataForm){
    return fetch ((`${this._baseUrl}${this._idGroup}/users/me/avatar`), {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: dataForm.avatarUrl,      
    }),
    headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  addNewCard(dataCard){
    return fetch ((`${this._baseUrl}${this._idGroup}/cards`), {
      method: 'POST',
      body: JSON.stringify({
        name: dataCard.cardName,  
        link: dataCard.cardUrl    
      }),
      headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  deleteCard(cardId){
    return fetch((`${this._baseUrl}${this._idGroup}/cards/${cardId}`), //Вместо cardId в URL нужно подставить параметр _id карточки, которую нужно удалить. _id каждой карточки есть в её JSON:
    {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  addLike(cardId){
    return fetch ((`${this._baseUrl}${this._idGroup}/cards/${cardId}/likes`),
    {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
   
  }

  deleteLike(cardId){
    return fetch ((`${this._baseUrl}${this._idGroup}/cards/${cardId}/likes`),
    {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    
    
  }
}


