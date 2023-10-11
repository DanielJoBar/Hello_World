import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';
import { ToastController, ToastOptions  } from '@ionic/angular';
import { UserInfoFavClicked } from './user-info/user-info-fav-clicked';
import { UserServiceService } from '../user-service.service';
import { FavoritosService } from './favoritos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
//Hay que hacer un userformComponent que sera un modal 
//Repasar el componentProps para el userformComponent
export class HomePage implements OnInit {
	public loading:boolean = false;
  constructor(
	private router:Router,
	private toast:ToastController,
	public userService:UserServiceService,
	public favService:FavoritosService
	) {}
	//El on init es una parte del ciclo de vida de la pagina (ng representa a angular y OnInit() la fase del ciclo de vida)
	
	ngOnInit(): void {
		 this.loading = true
			zip([this.favService.getAllFav()],[this.userService.getAll()]).subscribe(()=>{
				this.loading=false
			this.userService.getAll().subscribe();
			//this.favService.getAllFav().subscribe()
			//Ahora tendria que Crear las tarjetas y llamarlas aqui con una funcion
			})
		
		/**
		 * this.userService.getAll().subscribe(_userService=>{
			this.loading = false;
		})	
		 */
	}
	//Funcion del boton de favoritos, emisor del mensaje(toast)
	public onFavClicked(user:User, event:UserInfoFavClicked){
		//Guardamos en una variable el usuario que recibe
		var _user:User = {...user};
		//Aqui lo que hacemos es que el fav del user se a igual al fav del event
		_user.fav= event.fav??false;//Si fav es undefined se pone a falso por defecto 
		this.userService.updateUser(_user).subscribe(
			{next:user=>{
				const options:ToastOptions = {
					message:`User ${user.name} ${user.surname} ${event.fav?'added':'removed'} ${event.fav?'to':'from'} favourites`, //mensaje del toast
					duration:1000, // 1 segundo
					position:'bottom', // el toast se situa en la parte inferior
					color:`${event.fav? 'success':'danger'}`, // color del toast
					cssClass:'fav-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
				  };
				  this.toast.create(options).then(toast=>toast.present());
				},
				error: err=>{
					console.log(err);
				}
			}
		);
	}

	//Funcion del cubo de basura, borrador de tarjetas 
	public onDelClicked(user:User){
		var _user:User ={...user};//Guardamos el usuario en una variable local
		//Cogemos nuestra lista y borramos al usuario
		this.userService.deleteUser(_user).subscribe(
			{next:user=>{
				//Configuramos el toast
				const options:ToastOptions = {
					message:`User ${user.name} ${user.surname} was deleted successfully`, //mensaje del toast
					duration:1000, // 1 segundo
					position:'bottom', // el toast se situa en la parte inferior
					color:'danger', // color del toast
					cssClass:'fav-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
				  };
				  this.toast.create(options).then(toast=>toast.present());
			},
			error: err=>{
				console.log(err)
			}
		});
	}
	
	
}
