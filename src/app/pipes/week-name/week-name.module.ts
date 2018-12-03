import { NgModule } from '@angular/core';
import { WeekNamePipe } from './week-name.pipe';

@NgModule({
    declarations: [ WeekNamePipe ],
    exports: [ WeekNamePipe ]
})
export class WeekNameModule {  }
