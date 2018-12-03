import { Component } from '@angular/core';
import { Dieta } from 'src/app/model/dieta';
import { PratoService } from 'src/app/services/prato.service';

@Component({
    selector: 'dieta',
    templateUrl: './dieta.component.html'
})
export class DietaComponent {
    dieta: Dieta;

    constructor(
        private service: PratoService
    ) {
        this.dieta = new Dieta();
    }

    getPratos() {
        return this.service.getPratos();
    }
}
