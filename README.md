## Description
This App , is running in cloud for the sake of UAT but also has unit tests embedded and can be triggered with `npm test`.
To make the best of use , it allows signing in users and anonymous by email users to create bookings seamlessly and order them.
There is more that could be done functionality wise like Auth, Access controls , Cleanups after orders placed. Js Docs, Linting, Reusability e.t.c 
For the sake of having less complexity and readability there only 2 resolvers in the project. The User resolver handles all user operations

Thank you!

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
