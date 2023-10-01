import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { UserInfoComponent } from './user-info/user-info.component';
import { HomePageRoutingModule } from './home-routing.module';
import { PrimeraLetraMayusculaPipe } from '../primera-letra-mayuscula.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,UserInfoComponent,PrimeraLetraMayusculaPipe] //Declaramos el UserInfoComponent (Los componentes que vamos a utilizar)
})
export class HomePageModule {}
