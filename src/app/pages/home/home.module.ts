import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { WeekNameModule } from 'src/app/pipes/week-name/week-name.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    WeekNameModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }])
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
