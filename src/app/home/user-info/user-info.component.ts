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
  @Output() onFavClicked: EventEmitter<UserInfoFavClicked> =
    new EventEmitter<UserInfoFavClicked>();

  constructor() {}

  ngOnInit() {}
  onFavClick(event?: any) {
    this.onFavClicked.emit({
      fav: !(this.user?.fav ?? false), // Devolvemos el estado contrario al que tenemos
    });
    event.stopPropagation();
  }
}