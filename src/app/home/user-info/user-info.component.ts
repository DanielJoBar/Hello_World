import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user';
import { UserInfoFavClicked } from './user-info-fav-clicked';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() user?: User | null;
  @Output() onFavClicked: EventEmitter<UserInfoFavClicked> = new EventEmitter<UserInfoFavClicked>();
  @Output() onDelClicked: EventEmitter<void> = new EventEmitter<void>();
    //IMPORTANTE _____ USAR EL EVENT DE ANGULAR PORQUE TS TIENE SUS PROPIOS EVENTOS Y ESTO CAUSA ERRORES
  //El profe creó un evento de cliqueo en la targeta con @Output
  //@Output() onCardClicked : EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
  //Emisor del evento onFavClick(hacer click en el corazon de fav de la tarjeta)
  onFavClick(event: any) {//El resultado de este evento llega al homepage que lo mostrara por pantalla 
    //Esto es para emitir el evento cuando hagan click (onFavClicked.emit)
    this.onFavClicked.emit({//La doble interrogacion significa que si el valor sale nulo o indefinido se convierta en false
      fav: !(this.user?.fav ?? false), // Devolvemos el estado contrario al que tenemos
    });
    //Evita que se propague el evento del click (para que solo se clicke una targeta)
    event.stopPropagation();
  }
  //Emisor del evento onDelClick(hacer click en el cubo de basura de la tarjeta)
  onDelClick(event:any){
    //Emite el evento
    this.onDelClicked.emit();
    //Evita que se propague al resto de tarjetas
    event.stopPropagation();
  }
}