import { Component, OnInit } from '@angular/core';
import { BOOKS } from '../dummy';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {
  currentUser = 1;

  initBooks(): void {
    if (!localStorage.getItem('books' + this.currentUser)) {
      localStorage.setItem('books' + this.currentUser, JSON.stringify(BOOKS));
    }
  }

  constructor() { }

  ngOnInit() {
    this.initBooks();
  }

}
