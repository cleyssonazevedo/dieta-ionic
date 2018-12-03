import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Prato } from './model/prato';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage
  ) {
    this.initializeApp();

    this.storage.get('pratos')
      .then((data) => {
        if (data === undefined || data === null) {
          this.storage.set('pratos', [
            {
                nome: 'Arroz e feijão (100g)',
                calorias: 151
            },
            {
                nome: 'Batata frita (100g)',
                calorias: 312
            },
            {
                nome: 'Espaguete',
                calorias: 158
            },
            {
                nome: 'Macarrão com molho à bolonhesa',
                calorias: 151
            },
            {
                nome: 'Miojo',
                calorias: 412
            },
            {
                nome: 'Pizza',
                calorias: 266
            }
        ] as Array<Prato>);
        }
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
