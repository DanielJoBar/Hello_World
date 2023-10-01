import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomePage } from './welcome/welcome.page';

@NgModule({
  declarations: [AppComponent,WelcomePage],
  imports: [BrowserModule/*Modulo del nanvegador*/, IonicModule.forRoot()/*Modulo de Ionic*/, AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],//Componente previamente declarado que te manda al app-routing para ver la ruta a donde se quiere llevar
})
export class AppModule {}
