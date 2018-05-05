import { Component, OnInit } from '@angular/core';
import { USERS } from '../dummy';
import { User } from '../user';
import { Router } from '@angular/router';
import { MessageService } from '../message/message.service';
import { DummyService } from '../dummy/dummy.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  custom_users = [];
  users = [];
  registerActive = false;
  registerToggleLabel = 'Register';

  // Login form submit function - validate and either log in or display error

  loginAttempt(form: any): void {
    if (form.status === 'INVALID') {
      this.messageService.add('Fields cannot be empty');
    } else {
      const userID = this.validateLogin(form.value.books_login, form.value.books_password);
      if (userID) {
        this.loginUser(userID);
      } else {
        this.messageService.add('Login and password don\'t match');
      }
    }
  }

  // Login validation function

  validateLogin(login, password): any {
    const match = <number>this.users.findIndex(x => x.login === login && x.password === password);

    return (match > -1) ? this.users[match].id : false;
  }

  // Login function - save flag (and book collection, if empty) in storage and navigate to dashboard

  loginUser(id): void {
    sessionStorage.setItem('loggedIn', id);
    this.dummyService.initBooks();
    this.router.navigate(['/dashboard']);
  }

  // Register Toggle

  registerToggle(): void {
    this.registerActive = !this.registerActive;
    this.registerToggleLabel = this.registerToggleLabel === 'Register' ? 'Cancel' : 'Register';
  }

  // Register form submit function - check if login taken and either register or display error

  registerAttempt(form: any): void {
    if (form.status === 'INVALID') {
      this.messageService.add('Fields cannot be empty');
    } else {
      const userID = this.validateRegister(form.value.books_reg_login);

      if (userID) {
        this.messageService.add('Registration successful! You can log in now.');
        this.registerUser(userID, form.value.books_reg_login, form.value.books_reg_password);
      } else {
        this.messageService.add('User with that login already exists.');
      }
    }
  }

  // Register validation function

  validateRegister(login): any {
    const match = <number>this.users.findIndex(x => x.login === login);

    return (match > -1) ? false : this.users.length + 1;
  }

  // Registration function - save new user in local storage

  registerUser(id, login, password): void {
    const newUser = new User();
    newUser.id = id;
    newUser.login = login;
    newUser.password = password;

    this.custom_users.push(newUser);
    this.users.push(newUser);
    localStorage.setItem('custom_users', JSON.stringify(this.custom_users));
  }

  constructor(private router: Router, private dummyService: DummyService, private messageService: MessageService) {}

  // On initial run check if user logged in: If yes, redirect to dashboard, if no, get custom users from storage and add them to dummy users list

  ngOnInit() {
    if (sessionStorage.getItem('loggedIn')) {
      this.router.navigate(['/dashboard']);
    } else {
      this.dummyService.initCustomUsers();
      this.custom_users = JSON.parse(localStorage.getItem('custom_users'));
      this.users = (this.custom_users.length === 0) ? USERS : [...USERS, ...this.custom_users];
    }
  }
}
