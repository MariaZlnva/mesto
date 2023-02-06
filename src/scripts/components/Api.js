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
    .then(res => res.json())
    .catch((err) => console.log('error'))
  }

  getItemsServer(){
    return fetch (`${this._baseUrl}${this._idGroup}/cards`, {
      headers: this._headers
    })
    .then(res => res.json())
    .catch((err) => console.log('error'))
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
    .then(res => res.json())
  }

  changeAvatar(dataForm){
    return fetch ((`${this._baseUrl}${this._idGroup}/users/me/avatar`), {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: dataForm.avatarUrl,      
    }),
    headers: this._headers
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
  }
}


  