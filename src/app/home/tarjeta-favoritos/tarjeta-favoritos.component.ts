import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FavoritosService } from '../favoritos.service';
import { UserInfoFavClicked } from '../user-info/user-info-fav-clicked';
@Component({
  selector: 'app-tarjeta-favoritos',
  templateUrl: './tarjeta-favoritos.component.html',
  styleUrls: ['./tarjeta-favoritos.component.scss'],
})
export class TarjetaFavoritosComponent  implements OnInit {
  @Input()  id?:number|null ;
  @Output() onMinFavCardDelClicked: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}
  ngOnInit() {}
  onMinFavCardDelClick(event:any){
    this.onMinFavCardDelClicked.emit();
    event.stopPropagation();
  }
}
