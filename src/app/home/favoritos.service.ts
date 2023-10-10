import { Injectable } from '@angular/core';
import { FavoritosInterface } from './favoritos-interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Fav } from './fav';
import { UserServiceService } from '../user-service.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService implements FavoritosInterface {
  private _Fav: BehaviorSubject<Fav[]> = new BehaviorSubject<Fav[]>([]);
  public Favs$: Observable<Fav[]> = this._Fav.asObservable();
  constructor(public userService:UserServiceService) {}

  //Editar , las listas de favoritos solo almacenan ids de los usuarios en fav
  getAllFav(): Observable<Fav[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        var fav = [{ id: 1 }, { id: 6 }, { id: 3 }];
        this._Fav.next(fav);
        observer.next(fav);
        observer.complete();
      }, 1000);
    });
  }
  addFav(id: number): Observable<Fav> {
    var _fav = [...this._Fav.value];
    return new Observable<Fav>((observer) => {
      setTimeout(() => {
        var fav = _fav.find((fav) => fav.id == id);
        if (!fav) observer.next(fav);
        else observer.error('El usuario ya esta favorito');
        observer.complete();
      }, 1000);
    });
  }
  delFav(id: number): Observable<Fav> {
    var _fav = [...this._Fav.value];
    return new Observable<Fav>((observer) => {
      setTimeout(() => {
        var index = _fav.findIndex((favIndex) => favIndex.id == id);
        if (index >= 0) {
          _fav = [..._fav.slice(0, index), ..._fav.slice(index + 1)];
          this._Fav.next(_fav);
          observer.next();
        } else observer.error('No existe el usuario en la lista');
        observer.complete();
      }, 1000);
    });
  }
  delAllFav(): Observable<void> {
    return new Observable<void>((observer) => {
      this._Fav.next([]);
      observer.next();
      observer.complete();
    });
  }
}
