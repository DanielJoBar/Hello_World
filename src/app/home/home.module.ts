import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { UserInfoComponent } from './user-info/user-info.component';
import { HomePageRoutingModule } from './home-routing.module';
import { PrimeraLetraMayusculaPipe } from './Pipes/primera-letra-mayuscula.pipe';
import { HighlightDirective } from '../Directive/highlight.directive';
import { FavPipe } from './Pipes/fav.pipe';
import { TarjetaFavoritosComponent } from './tarjeta-favoritos/tarjeta-favoritos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,UserInfoComponent,PrimeraLetraMayusculaPipe,HighlightDirective, FavPipe,TarjetaFavoritosComponent] //Declaramos el UserInfoComponent (Los componentes que vamos a utilizar)
})
export class HomePageModule {}
