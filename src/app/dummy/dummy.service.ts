import { Injectable } from '@angular/core';
import { BOOKS } from '../dummy';

@Injectable()
export class DummyService {

    constructor() { }

    // If user doesn't have any books yet, provide him with dummy data

    initBooks(): void {
        let currentUser = sessionStorage.getItem("loggedIn");

        if (currentUser) {
            if (!localStorage.getItem('books' + currentUser)) {
                localStorage.setItem('books' + currentUser, JSON.stringify(BOOKS));
            }
        }
    }

    // If no custom users have been created yet, save an empty array to storage

    initCustomUsers(): void {
        if (!localStorage.getItem('custom_users')) {
            localStorage.setItem('custom_users', JSON.stringify([]));
        }
    }
}

