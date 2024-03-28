import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  //Al ser privado no se puede modificar fuera de este servicio por error
  //Por ello para poder obtener este valor fuera creamos un metodo que devuelve el valor
  public gifList: Gif[] = [];
  private _tagHistory: string[] = [];
  private ApiKey:string = 'LuELYCTRtdDhzZuHhpBlNy1wFXFvuiEI'
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs'

  constructor( private http:HttpClient ) {
    this.loadLocalStore()
  }

  get tagsHistory() {
    return [...this._tagHistory];
  }

  private saveLocalStore():void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private loadLocalStore():void {
    if (!localStorage.getItem('history')) return;
    //Cargamos el sidebar
    this._tagHistory = JSON.parse( localStorage.getItem('history')! );
    //Cargamos los gifs(las imagenes)
    if(this._tagHistory.length === 0) return;
    this.searchTag(this.tagsHistory[0])
  }

  private ValidarDato(datoNuevo:string){
    if (datoNuevo.length === 0 ) return  //Si está vacio no hace nada

    if (this._tagHistory.includes(datoNuevo)){
      //Si ya estaba en la lista lo quitamos
      this._tagHistory = this._tagHistory.filter( (DatoViejo) => DatoViejo != datoNuevo)
    }

    //Se añade
    this._tagHistory.unshift(datoNuevo)

    //Se impide que la lista sea mayor de 10
    this._tagHistory = this._tagHistory.splice(0,10);

    this.saveLocalStore()
  }

  searchTag( datoNuevo:string ):void {
    this.ValidarDato(datoNuevo)

    const params = new HttpParams()
      .set('api_key', this.ApiKey)
      .set('limit', '10')
      .set('q', datoNuevo)

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe(resp => {
        //Aquí obtenemos el resultado de esta petición
        this.gifList = resp.data;
        console.log( this.gifList );
      });



    // async searchTag( datoNuevo:string ):Promise<void> {

    //1º metodo con javascript
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=LuELYCTRtdDhzZuHhpBlNy1wFXFvuiEI&q=valorant&limit=10')
    //   .then( resp => resp.json)
    //   .then( data => console.log(data.toString));

    //2º metodo con javascript (este es el que me funcionó)
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=LuELYCTRtdDhzZuHhpBlNy1wFXFvuiEI&q=valorant&limit=10')
    // const data = await resp.json();
    // console.log(data)
  }



}
