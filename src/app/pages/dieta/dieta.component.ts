import { Component } from '@angular/core';
import { Dieta } from 'src/app/model/dieta';
import { PratoService } from 'src/app/services/prato.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Prato } from 'src/app/model/prato';
import { Subscription } from 'rxjs';
import { filter, mapTo, map, defaultIfEmpty } from 'rxjs/operators';

@Component({
    selector: 'dieta',
    templateUrl: './dieta.component.html'
})
export class DietaComponent {
    private _subscription: Subscription;

    pratos: Prato[];
    dieta: FormGroup;

    constructor(
        private alert: AlertController,
        private service: PratoService,
        private nav: NavController,
        private builder: FormBuilder
    ) {
        this.newDieta();
        this.service.getPratos()
            .subscribe((pratos) => {
                this.pratos = pratos;
                console.log('Pratos', pratos);
            });
    }

    private newDieta() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }

        this.dieta = this.builder.group({
            prato: ['', Validators.required],
            quantidade: [null, [Validators.required, Validators.min(1)]],
            calorias: [0],

            domingo: [false],
            segunda: [false],
            terca: [false],
            quarta: [false],
            quinta: [false],
            sexta: [false],
            sabado: [false],
        });
    }

    saveData() {
        const dieta = this.dieta.value as Dieta;

        if (
            this.dieta.valid &&
            (
                dieta.domingo ||
                dieta.segunda ||
                dieta.terca ||
                dieta.quarta ||
                dieta.quinta ||
                dieta.sexta ||
                dieta.sabado
            )
        ) {
            dieta.calorias = this.pratos.find((prato) => prato.nome === dieta.prato).calorias;
            this.service.setDieta(dieta);

            this.alert.create({
                header: 'Dados Salvos',
                subHeader: 'Clique em OK para voltar para a home ou cancelar para limpar e inserir novo item',
                animated: true,
                buttons: [
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        handler: () => this.dieta.reset()
                    },
                    {
                        text: 'OK',
                        handler: () => this.nav.goBack()
                    }
                ]
            }).then((res) => res.present());
        } else {
            if (this.dieta.get('prato').invalid) {
                this.alert.create({
                    header: 'Dados inválidos',
                    subHeader: 'É necessário escolher um dos pratos para poder salvar dos dados',
                    animated: true,
                    buttons: ['OK']
                }).then((res) => res.present());
            } else {
                if (this.dieta.get('quantidade').invalid) {
                    this.alert.create({
                        header: 'Dados inválidos',
                        subHeader: 'É necessário inserir a quantidade de pratos',
                        animated: true,
                        buttons: ['OK']
                    }).then((res) => res.present());
                } else {
                    this.alert.create({
                        header: 'Dados inválidos',
                        subHeader: 'É necessário escolher pelo menos um dos dias da semana para inserir os pratos',
                        animated: true,
                        buttons: ['OK']
                    }).then((res) => res.present());
                }
            }
        }
    }

    returnToBack() {
        this.nav.goBack();
    }
}
