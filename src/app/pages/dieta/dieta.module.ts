import { NgModule } from '@angular/core';
import { DietaComponent } from './dieta.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{ path: '', component: DietaComponent }])
    ],
    declarations: [DietaComponent]
})
export class DietaModule { }
