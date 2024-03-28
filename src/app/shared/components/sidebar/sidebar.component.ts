import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: `sidebar.component.html`,
  styleUrl: './sidebar.component.css',
})

export class SidebarComponent {

  constructor( private GifsService:GifsService ) {}

  get History() {
    return this.GifsService.tagsHistory
  }

  @ViewChild('TagButton')
  public tagButton!: ElementRef<HTMLButtonElement>;

  searchTag(newValue:string):void {
    this.GifsService.searchTag(newValue)
  }

}
