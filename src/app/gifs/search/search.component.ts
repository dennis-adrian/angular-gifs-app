import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  //ViewChild is similar to querySelector in that it searches for elements in the html
  //it can search the elements using the element type, the class, a local reference and more
  //in Angular, a local reference is represented by #referenceName
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;
  constructor(private gifsService: GifsService) {}

  search() {
    const value = this.txtSearch.nativeElement.value;
    this.gifsService.searchGifs(value);
    this.txtSearch.nativeElement.value = '';
  }
}
