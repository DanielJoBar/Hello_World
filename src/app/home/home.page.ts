import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';
import { ToastController, ToastOptions  } from '@ionic/angular';
import { UserInfoFavClicked } from './user-info/user-info-fav-clicked';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
	private _users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
	users$:Observable<User[]> = this._users.asObservable();

  constructor(
	private router:Router,
	private toast:ToastController
	) {}

	public onFavClicked(user:User, event:UserInfoFavClicked){
		//recibimos en user el usuario asociado a la tarjeta
		//recibimos en event un objeto del tipo UserInfoFavClicked que tiene una propiedad fav que indica si hay que añadir o eliminar de la lista de favoritos
		//creamos una copia del array actual de usuarios
		const users = [...this._users.value];
		//buscamos el índice del usuario para modificar su propiedad fav
		var index = users.findIndex((_user)=>_user.id == user.id);
		if(index!=-1)
		  //actualizamos la propiedad fav con el valor que hemos recibido por el evento
		  users[index].fav = event.fav??false; //en el caso de que fav sea undefined devolvemos falso.
		//notificamos un nuevo array de usuarios para que se renderice en la plantilla
		this._users.next([...users]);
		//Notificamos con un Toast que se ha pulsado
		const options:ToastOptions = {
		  message:`User ${users[index].name} ${users[index].surname} ${event.fav?'added':'removed'} ${event.fav?'to':'from'} favourites`, //mensaje del toast
		  duration:1000, // 1 segundo
		  position:'bottom', // el toast se situa en la parte inferior
		  color:'danger', // color del toast
		  cssClass:'fav-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
		};
	 
	 
		//creamos el toast y lo presentamos (es una promesa por eso el then)
		this.toast.create(options).then(toast=>toast.present());
	  }
	 

	valorEnFuturo(): Observable<number> {
	  return new Observable<number>((observer) => {
	    setTimeout(() => {
	      const randomValue = Math.random() * 100;
	      observer.next(randomValue);
	      observer.complete();
	    }, 1000);
	  });
	}
	
	ngOnInit(): void {
		let index =0;
		var users:User[] = [
			{ id:1,name: 'Rosa', surname: 'Berlin', age: 43,fav:true},
			{ id:2,name: 'Laura', surname: 'Rama', age: 19,fav:false},
			{ id:3,name: 'David', surname: 'Corcho', age: 23,fav:true},
			{ id:4,name: 'Rubén', surname: 'Maldonado', age: 29,fav:false},
			{ id:5,name: 'Luna', surname: 'García', age: 35,fav:true},
		  ];
		  this._users.next(users)
		  /* setInterval(() => {
	    if (index < 5) {
	      var users:User[] = this._users.value;
	      users.push(users[index]); 
	      this._users.next(users);
	      index++; 
	    }
	  }, 1000); */
	}
}
