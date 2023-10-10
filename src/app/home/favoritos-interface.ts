import { Observable } from "rxjs";
import { Fav } from "./fav";

export interface FavoritosInterface {
    /** Devuelve todos los usuarios que son fav
     * @returns todos los fav
    */
    getAllFav():Observable<Fav[]>;
    /** Devuelve el usuario que se elimina
    * @param user  para añadir a fav
    * @returns un user de fav
    */
   addFav(fav:number):Observable<Fav>;
   
   /** Devuelve el usuario que se borra de fav
    * @param user para eliminar de fav
    * @returns todos los fav
   */
    delFav(fav:number):Observable<Fav>;
    /** No devuelve nada, borra todos los usuarios de fav*/
    delAllFav():Observable<void>;
}
