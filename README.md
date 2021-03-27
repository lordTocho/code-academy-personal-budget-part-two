# code-academy-personal-budget-part-two

## Portfolio

This is a second part of the [CodeAcademy Portfolio project](https://www.codecademy.com/paths/back-end-engineer-career-path/tracks/becp-relational-database-and-software-architecture-portfolio-project/modules/becp-personal-budget-part-ii/kanban_projects/ext-proj-personal-budget-ii)

## Requirements

See the Requirements.md file in this repo for the different business requirements

## Prequisites
Before bringing the down the application to run on your local machine, make sure that you have the following things installed.

* [NodeJS](https://nodejs.org/en/download/)
* NPM
* [Postman](https://www.postman.com/downloads/)
* [PostgreSQL](https://www.postgresql.org/)

## Install
After bringing down the code to your local machine, open a terminal and navigate to the directory where you downloaded this repo. Run the command `npm install` to install all of the NPM modules that are listed in the package.json file.

## Configuration

### Add in config.json file
Copy and paste the config.json file to the config folder

```
{
  "development": {
    "username": "<POSTGRES SQL>",
    "password": "<DB PASSWORD>",
    "database": "EnvelopeBudget",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### Create the database in postgresql

On your Postgresql installation, create the database called EnvelopeBudget

### Use Sequelize to build the tables

Run the command down below to use sequelize to build out your tables

```
sequelize db:migrate
```

## Run the application
To run the application, perform the following things:
* Open terminal window and make sure that you are in the directory where the application is kept
* Run the command `npm start` --> open up Postman and tell it to listen for localhost:4000
* Use Postman to hit the different API calls.

```
// end point for users
<hostname>/api/users

// endpoint for envelope
<hostname>/api/envelope

```