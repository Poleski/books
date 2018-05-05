# Books Management Tool

Simple management tool for LM recruitment process.

## Demo

Live version available at [http://books.poleski.pl](http://books.poleski.pl)

## Description

Application consists of 2 main views - login and dashboard. Login view allows login and registration, dashboard holds the management tool itself. Both views are managed by routing module and user gets automatically redirected based on flag saved in browser session storage, changed upon successful login and logout

Browser storage also holds the custom user data (new accounts) and keep the track of book data assigned to each user. Since it doesn't use a real database, all data is kept inside the browser.

Management tool allows adding, deleting and editing simple book records (name, author, date of publishing and language). It also provides a way to search through the list for matching records and sort them by clicking table headers.

Application has been written in Angular 5, using Angular CLI and Typescript. Styles created with Less, compiled with Grunt with autoprefixer and minification.

## Supports

Any modern mobile/desktop browser and IE 9+.

## Installation

1. Run the package installer with `npm install`
2. Start with `ng serve` or `npm start`

## Usage

To log in, create new account or use one of the dummy ones:

```
Login: admin
Password: admin123!
```
```
Login: test
Password: Test1234
```

### Technologis used

- Angular 5
- Angular CLI
- npm
- TypeScript
- Grunt
- Less