import { Component, OnInit } from '@angular/core';
import { Dieta } from 'src/app/model/dieta';
import { PratoService } from 'src/app/services/prato.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Prato } from 'src/app/model/prato';
import { Subscription } from 'rxjs';

@Component({
    selector: 'dieta',
    templateUrl: './dieta.component.html'
})
export class DietaComponent implements OnInit {
    private _subscription: Subscription;
    private _edit: boolean;

    pratos: Prato[];
    dieta: FormGroup;

    constructor(
        private alert: AlertController,
        private service: PratoService,
        private nav: NavController,
        private builder: FormBuilder
    ) {
        this.service.getPratos()
            .subscribe((pratos) => {
                this.pratos = pratos;
                console.log('Pratos', pratos);
            });
    }

    ngOnInit() {
        if (this.service.getEditDieta() !== undefined) {
            this.newDieta(this.service.getEditDieta());
            this._edit = true;
        } else {
            this._edit = false;
            this.newDieta();
        }
    }

    private newDieta(dieta?: Dieta) {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }

        if (dieta) {
            this.dieta = this.builder.group({
                prato: [ dieta.prato || '', Validators.required],
                quantidade: [ dieta.quantidade || null, [Validators.required, Validators.min(1)]],
                calorias: [ dieta.calorias || 0],

                domingo: [ dieta.domingo || false],
                segunda: [ dieta.segunda || false],
                terca: [ dieta.terca || false],
                quarta: [ dieta.quarta || false],
                quinta: [ dieta.quinta || false],
                sexta: [ dieta.sexta || false],
                sabado: [ dieta.sabado || false],
            });
        } else {
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

            if (this._edit) {
                this.service.saveEditDieta(dieta);
            } else {
                this.service.setDieta(dieta);
            }

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
