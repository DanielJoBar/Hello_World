import { Observable } from "rxjs";
import { User } from "./home/user";

//getAll(),getFavourite(),deleteUser();,deleteAll(),update()
export interface UserServiceInterface{
/**Esta funcion lo que hace es obtener todas la lista de usuarios 
 * @return Devuelve una lista de usuarios 
 */
getAll():Observable<User[]>;
/**Esta funcion lo que hace es obtener un usuario 
 * @return Devuelve el usuario que se pidió
 */
getUser(id:number):Observable<User>;
/**Esta funcion lo que hace es editar un usuario 
 * @return Devuelve el usuario que se editó
 */
updateUser(user:User):Observable<User>;
/**Esta funcion lo que hace es borrar un usuario 
 * @return Devuelve el usuario que se borró
 */
deleteUser(user:User):Observable<User>;
/**Esta funcion lo que hace es borrar todos los usuarios 
 * @return no devuelve nada
 */
deleteAll():Observable<void>;
}
