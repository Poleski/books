import { Component, OnInit, Input } from '@angular/core';
import { Book} from '../book';
import { Router } from '@angular/router';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
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

    // Get latest book from storage

    this.books = JSON.parse(localStorage.getItem('books' + this.currentUser));

    // Save current sorting criteria for other functions to use

    this.currentSort = criteria;

    // If filter query present, filter book list name, author, pub date and language

    if (this.searchQuery.length > 0) {
      this.books = this.books.filter((x) => {
        const nameSearch = x.name.indexOf(this.searchQuery) > -1;
        const authorSearch = x.author.indexOf(this.searchQuery) > -1;
        const yearSearch = x.published.toString().indexOf(this.searchQuery) > -1;
        const languageSearch = x.language.indexOf(this.searchQuery) > -1;

        return nameSearch || authorSearch || yearSearch || languageSearch;
      });
    }

    // Sort books

    return this.books.sort((a, b) => {
      let x = a[criteria.sortColumn];
      let y = b[criteria.sortColumn];

      // Fix for incorrect string comparison

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

  // Add New form data parsing and preparing to save new book

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

  // Saving new book

  saveBook(book): void {
    const newBook = book;

    // Get ID of new book

    let newId = 0;
    let i = 1;
    while (newId === 0) {
      const index = this.books.findIndex(x => x.id === i);
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
    const index = this.books.findIndex(x => x.id === id);

    this.books.splice(index, 1);
    localStorage.setItem('books' + this.currentUser, JSON.stringify(this.books));
    this.messageService.add('Book deleted!');
    this.getBooks(this.currentSort);
  }

  // Edit book form processing

  editBookSubmit(id: number, form: any): void {
    if (form.status === 'INVALID') {
      this.messageService.add('Form filled in incorrectly!');
    } else {
      const index = this.books.findIndex( x => x.id === id);

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

  // Filtering function

  bookFilter(form: any): void {
    this.searchQuery = form.value.filter_text;
    this.getBooks(this.currentSort);
  }

  // Clearing the filter

  clearFilter(): void {
    this.searchQuery = '';
    this.getBooks(this.currentSort);
  }

  // Logout function

  logout(): void {
    sessionStorage.removeItem('loggedIn');
    this.messageService.add('Logged out successfully');
    this.router.navigate(['/']);
  }

  constructor(private router: Router, private messageService: MessageService) {

  }

  // On initial run check if user is logged: If no, redirect to login, if yes, get book and sort by publish date, descending (according to specs)

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
