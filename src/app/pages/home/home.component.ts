import { Component } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { PratoService } from 'src/app/services/prato.service';
import * as moment from 'moment';
import { Semana } from 'src/app/model/days';
import { Dieta } from 'src/app/model/dieta';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  person: {
    user: string;
    password: string;
  };

  constructor(
    private service: PratoService,
    private action: ActionSheetController,
    private alert: AlertController,
    private nav: NavController
  ) {
    moment.locale('pt-BR');
    console.log('Home');

    this.person = {
      user: null,
      password: null
    };
  }

  getWeek(): Semana {
    return moment().weekday();
  }

  getData() {
    return this.service.getDietas(this.getWeek());
  }

  itemSelected(item: Dieta) {
    let data;

    this.action.create({
      header: `${item.prato} (${item.quantidade})`,
      animated: true,
      buttons: [
        {
          text: 'Alterar',
          handler: () => {
            console.log('Alterar');
          }
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => this.excluirAlert(item)
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            data.dismiss();
          }
        }
      ]
    })
      .then((res) => data = res)
      .then((res) => res.present());

  }

  saveData() {
    console.log('Person', this.person);
  }

  get consumoDiario() {
    return this.service.getCaloriasFromWeek(this.getWeek());
  }

  excluirAlert(item: Dieta) {
    let alertControl;

    this.alert.create({
      animated: true,
      header: `Deseja realmente excluir o prato ${item.prato} da sua dieta?`,
      subHeader: `A exclusão deste prato é irreversível e reflete para todas as suas cópias neste dia`,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            alertControl.dismiss();
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.service.excluirItem(item, this.getWeek());
            this.confirmAlert();
          }
        }
      ]
    })
      .then((res) => alertControl = res)
      .then((res) => res.present());
  }

  confirmAlert() {
    this.alert.create({
      header: 'Prato excluído',
      subHeader: 'Dados excluídos, clique em OK para voltar para a tela inicial',
      buttons: ['OK']
    }).then((res) => res.present());
  }

  openAdicionar() {
    this.nav.navigateForward('dieta');
  }
}
