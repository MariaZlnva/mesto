//класс лписывает запросы к серверу

export default class Api {
  constructor({baseUrl, headers, idGroup}){
    this._baseUrl = baseUrl, 
    this._headers = headers,
    this._idGroup = idGroup
  }
//метод проверки ответа от сервера
  _checkResponse(res) {
    
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  

  getInfoUserServer(){
    return fetch (`${this._baseUrl}${this._idGroup}/users/me`, {
      headers: this._headers
    })
    .then(this._checkResponse)
    
  
  }

  getItemsServer(){
    return fetch (`${this._baseUrl}${this._idGroup}/cards`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  getInitialData(){
    return Promise.all([this.getInfoUserServer(), this.getItemsServer()])
    
    
  }

  changeProfileData(dataInput) { 
    return fetch(`${this._baseUrl}${this._idGroup}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: dataInput.nameUser,
        about: dataInput.aboutUser
      })
    })
    .then(this._checkResponse)
  }

  changeAvatar(dataForm){
    return fetch ((`${this._baseUrl}${this._idGroup}/users/me/avatar`), {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: dataForm.avatarUrl,      
    }),
    headers: this._headers
    })
    .then(this._checkResponse)
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
      .then(this._checkResponse)
  }

  deleteCard(cardId){
    return fetch((`${this._baseUrl}${this._idGroup}/cards/${cardId}`), //Вместо cardId в URL нужно подставить параметр _id карточки, которую нужно удалить. _id каждой карточки есть в её JSON:
    {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  addLike(cardId){
    return fetch ((`${this._baseUrl}${this._idGroup}/cards/${cardId}/likes`),
    {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse)
   
  }

  deleteLike(cardId){
    return fetch ((`${this._baseUrl}${this._idGroup}/cards/${cardId}/likes`),
    {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
    
    
  }
}


