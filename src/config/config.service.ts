export class ConfiguracaoService {
    public _API : string;

    constructor(){
      this._API = 'http://www.omdbapi.com/?apikey=eb1fece4&';
    }

    getAdressAPI() : string{
      return this._API;
    }
  }
