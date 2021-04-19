import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  //ViewChild is similar to querySelector in that it searches for elements in the html
  //it can search the elements using the element type, the class, a local reference and more
  //in Angular, a local reference is represented by #referenceName
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;
  constructor() {}

  search() {
    const value = this.txtSearch.nativeElement.value;
    console.log(value);
    this.txtSearch.nativeElement.value = '';
  }
}
