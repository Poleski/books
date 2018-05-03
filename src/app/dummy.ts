import { Book } from './book';
import { User } from './user';
import { BookList } from './book-list';

export const BOOKS: Book[] = [
    { id: 1, name: "Ostatnie życzenie", author: "Sapkowski A.", published: 1993, language: "pl"},
    { id: 2, name: "2001: Odyseja kosmiczna", author: "Clarke A.C.", published: 1968,language: "pl"},
    { id: 3, name: "The Last Ringbearer", author: "Eskov K.", published: 1999, language: "en"}
];

export const USERS: User[] = [
    { id: 1, login: "admin", password: "admin123!"},
    { id: 2, login: "test", password: "Test1234"}
];