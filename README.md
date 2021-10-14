
# Angular myFlix
## Client-Side

This site uses Angular to build the client-side for an application based on its existing server-side REST API.
## Authors

- [@MalloryHyneman](https://www.github.com/mhyneman8)

  
## Tech Stack

**Client:** Angular, Angular Material,

**Server:** Node, NPM

  
## Features

- Display welcome view where users can login or register
- Once authenticated, the user can view all movies
- Users can click a movie and get more details on that movie
- Single movie view gives buttons for more information on Genre and Director## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primary Color | ![#00303f](https://via.placeholder.com/10/00303f?text=+) #00303f |
| Secondary Color | ![#7a9d96](https://via.placeholder.com/10/7a9d96?text=+) #7a9d96 |
| Tertiary Color | ![#cae4db](https://via.placeholder.com/10/cae4db?text=+) #cae4db |
| Accent Color | ![#dcae1d](https://via.placeholder.com/10/dcae1d?text=+) #dcae1d |


## API Reference

#### Get all items

```http
  GET /myflix788.herokuapp.com/movies
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `JSON` | Returns a list of All movies to the user |

#### Get item

```http
  GET /myflix788.herokuapp.com/movies/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |



  
## Dependencies
- @angular/animations: "~12.2.0",
- @angular/cdk: "^12.2.6",
- @angular/common: "~12.2.0",
- @angular/compiler: "~12.2.0",
- @angular/core: "~12.2.0",
- @angular/forms: "~12.2.0",
- @angular/material: "^12.2.6",
- @angular/platform-browser: "~12.2.0",
- @angular/platform-browser-dynamic: "~12.2.0",
- @angular/router: "~12.2.0",
- rxjs: "~6.6.0",
- tslib: "^2.3.0",
- zone.js: "~0.11.4"

## Dev Dependencies
- @angular-devkit/build-angular: "~12.2.6",
- @angular/cli: "~12.2.6",
- @angular/compiler-cli: "~12.2.0",
- @types/jasmine: "~3.8.0",
- @types/node: "^12.11.1",
- angular-cli-ghpages: "^1.0.0-rc.2",
- jasmine-core: "~3.8.0",
- karma: "~6.3.0",
- karma-chrome-launcher: "~3.1.0",
- karma-coverage: "~2.0.3",
- karma-jasmine: "~4.0.0",
- karma-jasmine-html-reporter: "~1.7.0",
- typescript: "~4.3.5"

  
