export class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._hraders = headers;
  }

  _isOk = (res) => {
    if(res.ok) {
      return res.json();
    }

    return  Promise.reject(`Ошибка: ${res.status}`)
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}/${url}`, options).then(this._isOk)
  }

  getUserInfo() {
    return  this._request('users/me', {
      headers: this._hraders
    })
  }

  getInitialCards() {
    return  this._request('cards', {
      headers: this._hraders
    })
  }

  setUserInfo({name, about}) {
    return  this._request('users/me', {
      method: 'PATCH',
      headers: this._hraders,
      body: JSON.stringify({
        name,
        about
      })
    })
  }

  addCard({title, imageUrl}) {
    return  this._request('cards', {
      method: 'POST',
      headers: this._hraders,
      body: JSON.stringify({
        name: title,
        link: imageUrl
      })
    })
  }

  deleteCard(cardId) {
    return  this._request(`cards/${cardId}`, {
      method: 'DELETE',
      headers: this._hraders
    })
  }

  toggleLike(cardId, isLiked) {
    return  this._request(`cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._hraders
    })
  }

  // removeLike(cardId) {
  //   return  this._request(`cards/${cardId}/likes`, {
  //     method: 'DELETE',
  //     headers: this._hraders
  //   })
  // }

  uploadAvatar({imageUrl}) {
    return  this._request('users/me/avatar', {
      method: 'PATCH',
      headers: this._hraders,
      body: JSON.stringify({
        avatar: imageUrl
      })
    })
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-66/',
  headers: {
    authorization: '1b376021-e410-4f6f-96c7-0ea2e231f4c4',
    'Content-Type': 'application/json'
  }
})
export default api;
