import { Injectable } from '@angular/core';
import { UserServiceInterface } from './user-service-interface';
import { BehaviorSubject, Observable, observeOn } from 'rxjs';
import { User } from './home/user';
/**
 * Este user service lo que tienen que hacer es hacer todas las acciones 
 * con usuarios tipo un getAll(),getFavourite(),deleteUser();,deleteAll(),update()
 * OJO-> hacer una copia de la array user
 */
@Injectable({
  providedIn: 'root'
})

export class UserServiceService implements UserServiceInterface{
  private _users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
	users$:Observable<User[]> = this._users.asObservable();
  
  constructor() { }

  getAll(): Observable<User[]> {
    //Primero lo que hacemos es escribir el return del nuevo observable que tendra un observador que recibira la lista de usuarios
   return new Observable(observer=>{
    //Le pongo un timeout para simular que esta cargando con un timepo de 1s 
    //Lo de dentro del parentesisi es una funcion flecha y el tiempo del timeout
    setTimeout(()=>{
        var users:User[] = [
          { id:1,name: 'Rosa', surname: 'Berlin', age: 43,fav:true},
          { id:2,name: 'Laura', surname: 'Rama', age: 19,fav:false},
          { id:3,name: 'David', surname: 'Corcho', age: 23,fav:true},
          { id:4,name: 'Rubén', surname: 'Maldonado', age: 29,fav:false},
          { id:5,name: 'Luna', surname: 'García', age: 35,fav:true},
        ]
        //Actualizamos nuestra lista con los usuarios recibidos
        this._users.next(users)
        //Actualizamos la lista que recibio el observer
        observer.next(users)
        //Terminamos el observador
        observer.complete()
      },1000);
    });
  }
  getUser(id: number): Observable<User> {
   return new Observable(observer => {
      setTimeout(()=>{
        //Creamos una variable que alamacene el resultado de buscar el id que se recibio , osea el usuario correspondiente si existe
        //La funcion find busca el resultado de la funcion del parentesis 
        //Al fin y al cabo es un booleano ya que comprueba si existe el usuario entonces user puede ser false o true
        var user = this._users.value.find(user => user.id==id);
        //Si existe el usuario lo actualizamos en la lista
        if(user)
        observer.next(user);
        else
        observer.error("Ha ocurrido un error en la busqueda del usuario , no existe el usuario en la lista");
        observer.complete();
      },1000);
    })
  }
  public updateUser(user:User):Observable<User>{
    return new Observable(observer=>{
      setTimeout(() => {
        var _users = [...this._users.value];
        var index = _users.findIndex(u=>u.id==user.id);
        if(index<0)
          observer.error("Ha ocurrido un error en la busqueda del usuario , no existe el usuario en la lista");
        else{
          _users[index]=user;
          observer.next(user);
          this._users.next(_users);
        }
        observer.complete();
      }, 500);
      
    });
    
  }
  deleteUser(user: User): Observable<User> {
   return new Observable(observer=>{
      setTimeout(()=>{
        //Creamos una nueva lista _users que sea una copia de la lista original
        var _users = [...this._users.value];
        //Creamos una variable que almacene la posicion en la lista del usuario a borrar
        //la funcion findIndex es para buscar el indice de en una lista de algo
        var index = _users.findIndex(userIndex=>userIndex.id == user.id)
        if(index<0)
          observer.error("No existe el usuario en la lista");
        else{
          //Esto lo que hace es que en la lista _users recoge dos listas y las fusiona
          //_users.slice(0,index)  recoge la lista desde el indice 0 hasta el indice indicado
          //_users.slice(index+1) recoge la lista que hay despues del indice
          //En la segunda lista se pone +1 para coger el indice posterior y como no se pone segundo valor, el slide extiende hasta el final de la lista
          _users=[..._users.slice(0,index),..._users.slice(index+1)]
          this._users.next(_users)
          observer.next(user)
        }
        observer.complete();
      },1000);
   });
  }
  deleteAll(): Observable<void> {
    return new Observable(observer=>{
      setTimeout(()=>{
        //Si hacemos un .next con una lista vacia , loq ue hace es borrar la lista anterior
        this._users.next([]);
        observer.next();
        observer.complete();
      },1000);
    });
  }
}
