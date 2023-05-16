class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(resp) {
        if (resp.ok) {
            return resp.json();
        } else {
            Promise.reject(`Ошибка: ${resp.status} ${resp.statusText}`)
        }
    }

    getAllCards() {
        return fetch(this._baseUrl + "/cards", {
            method: "GET",
            headers: this._headers,
        })
            .then((responce) => {
                return this._checkResponse(responce);
            })
    }

    addNewCard(values) {
        return fetch(this._baseUrl + "/cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(values)
        })
            .then((responce) => {
                return this._checkResponse(responce);
            })
    }


    removeCard(id) {
        return fetch(this._baseUrl + `/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((responce) => {
                return this._checkResponse(responce);

            })
    }

    getUserData() {
        return fetch(this._baseUrl + '/users/me', {
            method: "GET",
            headers: this._headers,
        })
            .then((responce) => {
                return this._checkResponse(responce);
            })
    }

    editProfileInfo(values) {
        return fetch(this._baseUrl + '/users/me', {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: values.name,
                about: values.about,
            })
        })
            .then((responce) => {
                return this._checkResponse(responce);
            })

    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(this._baseUrl + `/cards/${id}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers,
        })
            .then((responce) => {
                return this._checkResponse(responce);
            })
    }


    editAvatar(link) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(link)

        })
            .then((responce) => {
                return this._checkResponse(responce);
            })
    }
}

const token = localStorage.getItem('token');

const newApi = new Api({
    // baseUrl: 'http://localhost:3000',
    baseUrl: 'https://velichkoo.nomoredomains.monster',
    headers: {
        authorization: `Bearer ${token}`,
        
        // 'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        // 'Access-Control-Allow-Origin': '*' 
    }
});

export default newApi;