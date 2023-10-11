import { Pipe, PipeTransform } from '@angular/core';
import { Fav } from '../fav';
import { User } from '../user';

@Pipe({
  name: 'fav'
})
export class FavPipe implements PipeTransform {

  transform(users: User[], favs: Fav[]): User[] {
    var _users:User[] = [...users];
    var _favs:Fav[] = [...favs];
    _users = users.map(user=>{
      return{
        id:user.id,
        name:user.name,
        surname:user.surname,
        age:user.age,
        fav:_favs.reduce((p,f)=> p || f.id==user.id,false)
      }
    })
    return _users;
  }

}
