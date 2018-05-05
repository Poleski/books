import { Component, OnInit, Input } from '@angular/core';
import { Book} from '../book';
import { Router } from '@angular/router';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  // Initial variables
  books = [];
  addNewActive = false;
  editBookActive = false;
  editBook = {};
  addNewToggleLabel = 'Add New';
  currentUser = sessionStorage.getItem('loggedIn');
  currentSort = new BookSearchCriteria();
  searchQuery = '';

  // Getting books for storage, assigning to local variables, sorting

  getBooks(criteria: BookSearchCriteria): any {
    this.books = JSON.parse(localStorage.getItem('books' + this.currentUser));

    this.currentSort = criteria;

    if (this.searchQuery.length > 0) {
        this.books = this.books.filter((x) => {
            const nameSearch = x.name.indexOf(this.searchQuery) > -1;
            const authorSearch = x.author.indexOf(this.searchQuery) > -1;
            const yearSearch = x.published.toString().indexOf(this.searchQuery) > -1;
            const languageSearch = x.language.indexOf(this.searchQuery) > -1;

            return nameSearch || authorSearch || yearSearch || languageSearch;
        });
    }

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
    this.addNewToggleLabel = this.addNewToggleLabel === 'Add New' ? 'Cancel' : 'Add New';
  }

  addNewSubmit(form: any): void {
    if (form.status === 'INVALID') {
      this.messageService.add('Form filled in incorrectly!');
    } else {
        const name = form.value.book_name;
        const author = form.value.book_author;
        const published = parseInt(form.value.book_published, 10);
        const language = form.value.book_language;

        this.saveBook({ name, author, published, language } as Book);
        this.messageService.add('Book saved!');
        this.getBooks(this.currentSort);
    }
  }

  // Saving new book item

  saveBook(book): void {
    const newBook = book;

    // Get ID of new book - will cause bug/feature if ID of deleted book gets reassigned, as other users will see new book instead of old.

    let newId = 0;
    let i = 1;
    while (newId === 0) {
        const index = this.books.findIndex(function (x) {
            return x.id === i;
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
  }

  // Delete book trigger

  deleteBook(id): void {
      const index = this.books.findIndex(function (x) {
          return x.id === id;
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
          const index = this.books.findIndex(function (x) {
              return x.id === id;
          });

          this.books[index].name = form.value.book_edit_name;
          this.books[index].author = form.value.book_edit_author;
          this.books[index].published = parseInt(form.value.book_edit_published, 10);
          this.books[index].language = form.value.book_edit_language;

          localStorage.setItem('books' + this.currentUser, JSON.stringify(this.books));
          this.messageService.add('Book editted!');
          this.editBookActive = false;
          this.getBooks(this.currentSort);
      }
  }

  bookFilter(form: any): void {
      this.searchQuery = form.value.filter_text;
      this.getBooks(this.currentSort);
  }

  logout(): void {
      sessionStorage.removeItem('loggedIn');
      this.messageService.add('Logged out successfully');
      this.router.navigate(['/']);
  }

  constructor(private router: Router, private messageService: MessageService) {

  }

  ngOnInit() {
      if (!sessionStorage.getItem('loggedIn')) {
          this.router.navigate(['/']);
      } else {
          this.getBooks({sortColumn: 'published', sortDirection: 'desc'});
      }
  }
}

export class BookSearchCriteria {
    sortColumn: string;
    sortDirection: string;
}
