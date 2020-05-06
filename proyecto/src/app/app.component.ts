import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from '../app/storage.service'
import { Router } from  "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    /*{
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },*/
    /*{
      title: 'List',
      url: '/list',
      icon: 'list'
    },*/
    {
      title: 'Acceder',
      url: '/login',
      icon: 'log-in'
    },
    {
      title: 'Usuarios',
      url: '/usuarios',
      icon: 'md-people'
    },
    {
      title: 'Categorias',
      url: '/categoria',
      icon: 'md-apps'
    }
  ];

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private  router:  Router,
    public storageService: StorageService
  ) {
    this.initializeApp();
  }

  initializeApp() 
  {

    this.storageService.getObject("usuario").then(result => {

      if(!result)
      {
        this.router.navigate(["/landing"])
        return
      }

      if ( result.codigo_tipousuario == 2) 
      {
        this.appPages.splice(1, 1)
        this.appPages.splice(1, 1)
      } 
      
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
      });

    });
  }
}
