# Book store api using Express.js and PostgreSQL

## Getting Started

Here is what you need to get it up and running:

## Pre-requisite

1. A running PostgreSQL Server
2. An empty DB on the PostgreSQL
3. `node` and `npm` installed
4. Postman or cURL (for testing the API)
5. A free `3000` PORT (you may change the port in `server.js`)

## Installation

1. Clone the repo

2. Install the dependencies

```bash
npm install
```

## Configuration

You will have to update some values in `config/config.json`

| key      | description                                                                                                      |
| -------- | ---------------------------------------------------------------------------------------------------------------- |
| HOST     | your host address on which postgreSQL is installed. Most probably `localhost`                                    |
| USER     | Username of the postgreSQL User (default: `postgres`)                                                            |
| PASSWORD | Password to the PostgreSQL User. You might have to set this via `\password username` command of PostgreSQL Shell |
| DB       | The DB Name of the empty DB you created in the second step of Pre-requisites                                     |

## Let's Go

You are now ready to start the API Server. Run the following command from the root of the repository:

```bash
npm start
```

## Demo

Here is a test run with output:

> Remember to set `Content-Type` to `application/json` for requests with body

### Test Route

#### Request

```bash
curl --location --request GET 'http://localhost:3000/'
```

#### Response

```json
{
    "message": "Welcome to Book Store Api",
    "developer": {
        "name": "Krutik Shukla"
    }
}
```

## Tested On

| Tool       | Version String                                        |
| :--------- | ----------------------------------------------------- |
| NPM        | 6.14.12                                               |
| Node       | v14.16.1                                              |
| PostgreSQL | psql (PostgreSQL) 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1) |
