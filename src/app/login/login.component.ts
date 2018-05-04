import { Component, OnInit } from '@angular/core';
import { USERS } from '../dummy';
import { User } from '../user';
import { Router } from '@angular/router';
import { MessageService } from '../message/message.service';
import { DummyService } from '../dummy/dummy.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  custom_users = '';
  users = [];
  registerActive = false;
  registerToggleLabel = 'Register';

  loginAttempt(form: any): void {
    if (form.status === 'INVALID') {
      this.messageService.add('fields cannot be empty');
    } else {
        let userID = this.validateLogin(form.value.books_login, form.value.books_password);
        if (userID) {
          this.messageService.add('login successful');
          this.loginUser(userID);
        } else {
          this.messageService.add('login and password don\'t match');
        }
    }
  }

  validateLogin(login, password): any {
    let match = <number>this.users.findIndex(function (x) {
        return x.login === login && x.password === password;
    });

    return (match > -1) ? this.users[match].id : false;
  }

  loginUser(id): void {
    sessionStorage.setItem('loggedIn', id);
    this.dummyService.initBooks();
    this.router.navigate(['/dashboard']);
  }

  registerToggle(): void {
      this.registerActive = !this.registerActive;
      this.registerToggleLabel = 'Register' ? 'Cancel' : 'Register';
  }

  registerAttempt(form: any): void {
    if (form.status === 'INVALID') {
      this.messageService.add('fields cannot be empty');
    } else {
        let userID = this.validateRegister(form.value.books_reg_login);
        console.log(userID);
        if (userID) {
          this.messageService.add('Registration successful. You can log in now');
            this.registerUser(userID, form.value.books_reg_login, form.value.books_reg_password);
        } else {
          this.messageService.add('User with that login already exists');
        }
    }
  }

  validateRegister(login): any {
    let match = <number>this.users.findIndex(function (x) {
        return x.login == login;
    });

    return (match > -1) ? false : this.users.length + 1;
  }

  registerUser(id, login, password): void {
    let newUser = new User();
    newUser.id = id;
    newUser.login = login;
    newUser.password = password;

    console.log(newUser);

    this.custom_users.push(newUser);
    this.users.push(newUser);
    localStorage.setItem('custom_users', JSON.stringify(this.custom_users));
  }

  constructor(private router: Router, private dummyService: DummyService, private messageService: MessageService) {

  }

  ngOnInit() {
      if(sessionStorage.getItem('loggedIn')) {
          this.router.navigate(['/dashboard']);
      } else {
          this.dummyService.initCustomUsers();
          this.custom_users = JSON.parse(localStorage.getItem('custom_users'));
          this.users = (this.custom_users.length === 0) ? USERS : [...USERS, ...this.custom_users];
      }
  }

}
