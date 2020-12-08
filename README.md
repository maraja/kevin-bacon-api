# Kevin Bacon API

This is a base project for an Express Serverless backend application, using AWS as Cloud Provider.

By running this project you will have a CRUD application by Express as NodeJs web application framework.
It is written in TypeScript to obtain all the advantages with respect to vanilla JavaScript.

In this project I use `tsoa` to register our Express routes and to obtain validation without using boilerplate code.

As all good CRUD services, we need a data source to manage our data.
To manage database object we are going to use Sequelize as ORM.

## Project setup

Run `npm install -g yarn` followed by `yarn` and install all the necessary dependencies.

## Local testing

Before running locally our functions, we need to setup the database.
You can run the docker-compose file to create a container with a Postgres database.

`docker-compose up`

When the container is up, run the migration file to correctly initialize the database:

`yarn migrate-db-local`

You can then begin running the API server with the following comand:

`yarn dev`

Note: If you plan on making changes to the routes, you must run `yarn generate-routes` before starting the server again. TSOA needs to regenerate all the routes in this situation. The project comes with the pre-generated routes, but don't forget to do this before pushing your code up.

## Documentation

The TSOA framework provides self-documentation using the OpenAPI 3.0 specification. To generate new documentation, run the `yarn generate-swagger` and yuou will find the resulting json spec in the `src/generated/` folder.

## Notes:

-   This iteration of the API is using a flat json file with limited actors.
-   The original dataset contains over 200,000 actors, which will require a sufficient amount of database storage and a well thought out ERD.
-   When running the `degrees-of-separation` call, the maximum recursion depth is set to 3 (i.e., it will do a BFS on 3 layers of actors). This is to ensure requests don't time out.
-   This implementation of degrees of separation is very inefficient. Consider only looking for connected actors with 1-2 degrees of separation for demonstration purposes.
-   To run the degrees-of-separation, you don't need to migrate any data (the flat file is included as a json in the data folder)
