import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController, Alert } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Filme } from '../../models/Filme';
import { ConfiguracaoMensagem } from '../../config/config.messages';

@Component({
    providers : [Filme, ConfiguracaoMensagem],
    selector : 'detalhar',
    templateUrl : 'detalhar.html'
})

export class FilmeDetalhe implements OnInit{
  public _alert : Alert;
  public filmeEncontrado : Filme = new Filme;

  constructor(public parametro : NavParams,
      public _navController : NavController,
      public _alertCtrl : AlertController,
      private _loadingCtrl: LoadingController,
      public _configuracaoMensagem: ConfiguracaoMensagem){}

  ngOnInit(){
    this.filmeEncontrado = this.parametro.get('filmeSelecionado');
  }
}
