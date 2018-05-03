import { Component, OnInit } from '@angular/core';
import { Book} from '../book';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  // Initial variables

  books = [];
  addNewActive = false;
  editBookActive = false;
  editBook = {};
  addNewToggleLabel = 'Add New';
  currentUser = 1;

  // Getting books for storage, assigning to local variables, sorting

  getBooks(criteria: BookSearchCriteria): void {
    this.books = JSON.parse(localStorage.getItem('books' + this.currentUser));

    return this.books.sort((a,b) => {
      let x = a[criteria.sortColumn];
      let y = b[criteria.sortColumn];

      x = typeof x === 'string' ? x.toUpperCase() : x;
      y = typeof y === 'string' ? y.toUpperCase() : y;

      if (criteria.sortDirection === 'desc') {
        return x < y;
      } else {
        return x > y;
      }
    });
  }

  // Sorting trigger

  onSorted($event) {
    this.getBooks($event);
  }

  // Add New button trigger

  addNewToggle(): void {
    this.addNewActive = !this.addNewActive;
    this.addNewToggleLabel = 'Add New' ? 'Cancel' : 'Add New';
  }

  addNewSubmit(name,author,published,language): void {
    // TODO Walidacja
    // TODO Czyszczenie pól
    this.saveBook({ name, author, published, language } as Book);
  }

  // Saving new book item

  saveBook(book): void {
    let newBook = book;

    // Get ID of new book - will cause bug/feature if ID of deleted book gets reassigned, as other users will see new book instead of old.

    let newId = 0;
    let i = 1;
    while (newId === 0) {
        let index = this.books.findIndex(function (x) {
            return x.id == i;
        });
        if (index === -1) {
            newId = i;
        } else {
            i++;
        }
    }

    newBook.id = newId;
    this.books.push(newBook);
    localStorage.setItem('books' + this.currentUser, JSON.stringify(this.books));
  }

  // Edit book trigger

  editBookToggle(book): void {
      this.editBookActive = true;
      this.editBook = book;
  }

  // Delete book trigger

  deleteBook(id): void {
      let index = this.books.findIndex(function (x) {
          return x.id == id;
      });

      this.books.splice(index, 1);
      localStorage.setItem('books' + this.currentUser, JSON.stringify(this.books));
  }

  editBookSubmit(id,name,author,published,language): void {

      let index = this.books.findIndex(function (x) {
          return x.id == id;
      });

      this.books[index].name = name;
      this.books[index].author = author;
      this.books[index].published = published;
      this.books[index].language = language;

      localStorage.setItem('books' + this.currentUser, JSON.stringify(this.books));

      this.editBookActive = false;
  }

  constructor() { }

  ngOnInit() {
    this.getBooks({sortColumn: 'id', sortDirection:'asc'});
  }
}

export class BookSearchCriteria {
    sortColumn: string;
    sortDirection: string;
}