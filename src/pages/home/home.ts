import { Component, OnInit } from '@angular/core';
import { NavController,  LoadingController, AlertController, Alert } from 'ionic-angular';
import { Http } from '@angular/http'
import { Formulario } from '../formulario/formulario';
import { Filme } from '../../models/Filme'
import { ConfiguracaoService } from '../../config/config.service';
import { ConfiguracaoMensagem } from '../../config/config.messages';

import 'rxjs/add/operator/map';

@Component({
  providers : [ ConfiguracaoService, ConfiguracaoMensagem ],
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  public self = this;
  private _alert : Alert;
  public filmes : Filme[] = [];

    constructor(public navCtrl: NavController,
                private _http: Http,
                private _loadingCtrl: LoadingController,
                private _alertCtrl: AlertController,
                public _configuracaoMensagem: ConfiguracaoMensagem,
                public _configuracaoService: ConfiguracaoService) {
    }

  ngOnInit() {
  
  }

  pesquisar(){
    this.navCtrl.push(Formulario);
  }

  criarMensagem(status){
    return this._alert = this._alertCtrl.create({
      title: (status == 200) ? this._configuracaoMensagem.getSucessoOperacaoTitulo() : this._configuracaoMensagem.getFalhaOperacaoTitulo() ,
      subTitle: (status == 200) ? this._configuracaoMensagem.getSucessoOperacaoMensagem() : this._configuracaoMensagem.getFalhaOperacaoMensagem(),
      buttons: [{
        text:'Fechar',
        handler:() => {this.navCtrl.setRoot(HomePage)}
      }]
    });
  }


}
