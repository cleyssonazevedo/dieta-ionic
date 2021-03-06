import { Injectable } from '@angular/core';
import { Prato } from '../model/prato';
import { Observable, from, of, } from 'rxjs';
import { filter, defaultIfEmpty } from 'rxjs/operators';
import { Dieta } from '../model/dieta';
import { Semana } from '../model/days';
import { Storage } from '@ionic/storage';

@Injectable()
export class PratoService {
    private dietas: Dieta[];
    private _edit: Dieta;

    constructor(
        private storage: Storage
    ) {
        this.dietas = [];

        from(this.storage.get('dietas'))
            .pipe(
                filter((dietas) => dietas !== undefined && dietas !== null),
                defaultIfEmpty([])
            )
            .subscribe((dietas) => this.dietas = dietas);
    }

    private get list() {
        return [
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
            },
            {
                nome: 'Feijoada',
                calorias: 146
            },
            {
                nome: 'Pudim de Pão',
                calorias: 306
            },
            {
                nome: 'Omelete',
                calorias: 93
            },
            {
                nome: 'Estrogonofe de Carne',
                calorias: 394
            },
            {
                nome: 'Salada de Folhas',
                calorias: 28
            },
            {
                nome: 'Salada de Frutas',
                calorias: 108
            },
            {
                nome: 'Cuscuz Paulista',
                calorias: 148
            },
            {
                nome: 'Virada paulista',
                calorias: 229
            }
        ] as Array<Prato>;
    }

    setEditDieta(dieta: Dieta) {
        this._edit = dieta;
    }

    getEditDieta() {
        return this._edit;
    }

    saveEditDieta(dieta: Dieta) {
        let result: boolean;

        const dietas = this.dietas.map((data) => {
            if (data === this._edit) {
                result = true;
                return dieta;
            } else {
                return data;
            }
        });

        if (result) {
            this.dietas = dietas;
            this.saveData();
            this._edit = undefined;
        }

        return result;
    }

    getPratos(): Observable<Prato[]> {
        return of(this.list);
    }

    setDieta(dieta: Dieta) {
        this.dietas.push(dieta);
        this.saveData();
    }

    private getDataFromWeek(week?: Semana): Dieta[] {
        switch (week) {
            case Semana.DOMINGO:
                return this.dietas.filter((dieta) => dieta.domingo);

            case Semana.SEGUNDA:
                return this.dietas.filter((dieta) => dieta.segunda);

            case Semana.TERCA:
                return this.dietas.filter((dieta) => dieta.terca);

            case Semana.QUARTA:
                return this.dietas.filter((dieta) => dieta.quarta);

            case Semana.QUINTA:
                return this.dietas.filter((dieta) => dieta.quinta);

            case Semana.SEXTA:
                return this.dietas.filter((dieta) => dieta.sexta);

            case Semana.SABADO:
                return this.dietas.filter((dieta) => dieta.sabado);

            default:
                return this.dietas;
        }
    }

    getDietas(week?: Semana) {
        return this.getDataFromWeek(week);
    }

    getData() {
        return this.dietas;
    }

    getCaloriasFromWeek(week?: Semana) {
        return this.getDataFromWeek(week)
            .reduce((total, value) => total += (value.calorias / 100) * value.quantidade, 0);
    }

    impledirDuplicacaoDieta(_: Dieta, __index: number, dietas: Dieta[]) {
        return dietas.reduce((data: Dieta[], dieta) => {
            const prato = data.find((item) => item.prato === dieta.prato);

            if (!prato) {
                data.push(dieta);
            } else {
                prato.quantidade += dieta.quantidade;
                prato.domingo = !prato.domingo ? dieta.domingo : prato.domingo;
                prato.segunda = !prato.segunda ? dieta.segunda : prato.segunda;
                prato.terca = !prato.terca ? dieta.terca : prato.terca;
                prato.quarta = !prato.quarta ? dieta.quarta : prato.quarta;
                prato.quinta = !prato.quinta ? dieta.quinta : prato.quinta;
                prato.sexta = !prato.sexta ? dieta.sexta : prato.sexta;
                prato.sabado = !prato.sabado ? dieta.sabado : prato.sabado;
            }

            return data;
        }, []);
    }

    excluirItem(item: Dieta, week: Semana) {
        const dieta = this.dietas.find((d) => item === d);

        switch (week) {
            case Semana.DOMINGO:
                dieta.domingo = false;
                break;

            case Semana.SEGUNDA:
                dieta.segunda = false;
                break;

            case Semana.TERCA:
                dieta.terca = false;
                break;

            case Semana.QUARTA:
                dieta.quarta = false;
                break;

            case Semana.QUINTA:
                dieta.quinta = false;
                break;

            case Semana.SEXTA:
                dieta.sexta = false;
                break;

            case Semana.SABADO:
                dieta.sabado = false;
                break;
        }

        this.saveData();
    }

    saveData() {
        this.storage.set('dietas', this.dietas);
    }

    clear() {
        this.storage.clear();
    }
}
