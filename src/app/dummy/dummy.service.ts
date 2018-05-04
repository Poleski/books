import { Injectable } from '@angular/core';
import { BOOKS } from '../dummy';

@Injectable()
export class DummyService {

    constructor() { }

    initBooks(): void {
        let currentUser = sessionStorage.getItem("loggedIn");

        if (currentUser) {
            if (!localStorage.getItem('books' + currentUser)) {
                localStorage.setItem('books' + currentUser, JSON.stringify(BOOKS));
            }
        }
    }

    initCustomUsers(): void {
        console.log("dummy2");
        if (!localStorage.getItem('custom_users')) {
            localStorage.setItem('custom_users', JSON.stringify([]));
        }
    }
}

