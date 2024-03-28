

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  styleUrl: 'search-box.component.css',
  template: `
  <h5>Buscar:</h5>
  <input type="text"
    class="form-control"
    placeholder="Buscar gifs ..."
    (keyup.enter)="searchTag()"
    #textTagInput
    id="inpBuscar"
  >
  `
})

export class SearchBoxComponent {

  @ViewChild('textTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor( private GifsService:GifsService ) { }

  searchTag():void {
    const newValue = this.tagInput.nativeElement.value;
    this.GifsService.searchTag(newValue)
    this.tagInput.nativeElement.value = '';
    console.log({newValue})
  }
}
