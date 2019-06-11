import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController, Alert } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Filme } from '../../models/Filme';
import { ConfiguracaoService } from '../../config/config.service';
import { ConfiguracaoMensagem } from '../../config/config.messages';
import { FilmeDetalhe } from '../detalhar/detalhar';
import { Http } from '@angular/http';

@Component({
    providers : [Filme, ConfiguracaoService, ConfiguracaoMensagem],
    selector : 'formulario',
    templateUrl : 'formulario.html'
})

export class Formulario implements OnInit{
  myColor: string;
  isRound: boolean;
  retornouFilme : boolean;
  loader : any;

  public _alert : Alert;
  public filme : Filme = new Filme;
  public filmeEncontrado : Filme = new Filme;

  constructor(public parametro : NavParams,
      public _navController : NavController,
      public _alertCtrl : AlertController,
      private _loadingCtrl: LoadingController,
      public _http: Http,
      public _configuracaoMensagem: ConfiguracaoMensagem,
      public _configuracaoService: ConfiguracaoService){
  }

  ngOnInit(){
    this.myColor = 'search-buttom';
    this.isRound = false;
    this.retornouFilme = false;

    this.loader = this._loadingCtrl.create({
        content : "Buscando o filme, aguarde..."
    });
  }

  detalhar(){
    this._navController.push(FilmeDetalhe, { filmeSelecionado: this.filmeEncontrado});
  }

  pesquisar(){
    if(this.verificarCamposObrigatorios(this.filme)){

      const url = this.putParametersIntoURL();

      //this.loader.present().then(()=>{
          this._http.get(url)
          .map(resp => resp.json())
            .toPromise()
              .then(elemento => {

                    //this.loader.dismiss();

                  this.filmeEncontrado = elemento;
                  this.retornouFilme = true;
              }).catch (erro => {
                this.loader.dismiss();
                this._alertCtrl.create({
                    title : this._configuracaoMensagem.getFalhaOperacaoTitulo(),
                    buttons : [{ text : "Estou ciente", handler:() => {this._navController.setRoot(HomePage)}}],
                    subTitle : this._configuracaoMensagem.getFalhaOperacaoMensagem()
                }).present();
              });
        //});

    }else{
        this._configuracaoMensagem.mostrarMensagemCamposObrigatorios(this);

        let array = this.getCamposVazios();

        this.limparCorCampos();

        array.forEach(element => {
            element.setAttribute("style", "color: #f53d3d");
        });
    }
  }

  putParametersIntoURL(){
    let url = this._configuracaoService.getAdressAPI();

    if(this.filme.title){
      url = url + `t=${this.filme.title}&`
    }
    if(this.filme.imdbID){
      url = url + `i=${this.filme.imdbID}&`
    }
    return url;
  }

  getCamposVazios(){
    let arr : any = [];

    if(!this.filme.title)
        arr.push(document.querySelector('#movie_title'));

    if(!this.filme.imdbID)
        arr.push(document.querySelector('#movie_id'));
     return arr;
  }

  limparCorCampos(){
    document.querySelector('#movie_title').setAttribute("style", "color: #0084b4");
    document.querySelector('#movie_id').setAttribute("style", "color: #0084b4");
  }

  verificarCamposObrigatorios(objeto){
    return (objeto.title || objeto.imdbID);
  }

}
