import { Component, OnInit, Input } from '@angular/core';
import { Book} from '../book';
import { Router } from '@angular/router';
import { MessageService } from '../message/message.service';

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
  currentUser = sessionStorage.getItem("loggedIn");
  currentSort = {};

  // Getting books for storage, assigning to local variables, sorting

  getBooks(criteria: BookSearchCriteria): any {
    this.books = JSON.parse(localStorage.getItem('books' + this.currentUser));

    this.currentSort = criteria;

    return this.books.sort((a, b) => {
      let x = a[criteria.sortColumn];
      let y = b[criteria.sortColumn];

      x = typeof x === 'string' ? x.toUpperCase() : x;
      y = typeof y === 'string' ? y.toUpperCase() : y;

      if (criteria.sortDirection === 'desc') {
        return x < y ? 1 : -1;
      } else {
        return x > y ? 1 : -1;
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

  addNewSubmit(form: any): void {
    if (form.status === 'INVALID') {
      this.messageService.add('Form filled in incorrectly!');
    } else {
        let name = form.value.book_name;
        let author = form.value.book_author;
        let published = parseInt(form.value.book_published);
        let language = form.value.book_language;

        this.saveBook({ name, author, published, language } as Book);
        this.messageService.add('Book saved!');
        this.getBooks(this.currentSort);
    }
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
      this.editBook = book;
      this.editBookActive = true;
      console.log(this.editBook);
  }

  // Delete book trigger

  deleteBook(id): void {
      let index = this.books.findIndex(function (x) {
          return x.id == id;
      });

      this.books.splice(index, 1);
      localStorage.setItem('books' + this.currentUser, JSON.stringify(this.books));
      this.messageService.add('Book deleted!');
      this.getBooks(this.currentSort);
  }

  editBookSubmit(id: number, form: any): void {

      if (form.status === 'INVALID') {
          this.messageService.add('Form filled in incorrectly!');
      } else {
          let index = this.books.findIndex(function (x) {
              return x.id == id;
          });

          this.books[index].name = form.value.book_edit_name;
          this.books[index].author = form.value.book_edit_author;
          this.books[index].published = parseInt(form.value.book_edit_published);
          this.books[index].language = form.value.book_edit_language;

          localStorage.setItem('books' + this.currentUser, JSON.stringify(this.books));
          this.messageService.add('Book editted!');
          this.editBookActive = false;
          this.getBooks(this.currentSort);
      }
  }

  logout(): void {
      sessionStorage.removeItem('loggedIn');
      this.messageService.add('Logged out successfully');
      this.router.navigate(['/']);
  }

  constructor(private router: Router, private messageService: MessageService) {

  }

  ngOnInit() {
      if(!sessionStorage.getItem("loggedIn")) {
          this.router.navigate(['/']);
      } else {
          this.getBooks({sortColumn: 'published', sortDirection:'desc'});
      }
  }
}

export class BookSearchCriteria {
    sortColumn: string;
    sortDirection: string;
}