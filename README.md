<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

An application that allows you to view, create, modify and delete any entity from the "Starwars" movies.
----------------------------------------------------------------------------------------------
## Launch app without docker

## Preparation
Create .env file or link - <https://drive.google.com/drive/folders/1MC0uaKWEwAfzs_Ap-c3_QjTrV5xbJgrt?usp=sharing>
In your local database needs to create databases manually and change MySQL username and password to your local database in the .env file:

create database starwars;   
create database db_test;

## Installation
$ npm install

## Run migrations
$ npm run migration:run 

Two files located in the "database/migration" will be run: one to create the tables, the other to populate the tables with data from swapi.

## Run app

$ npm run start 

$ npm run start:dev

 Follow the link <http://localhost:3001/api> in browser.

--------------------------------------------------------------------------------------------------------------------

## Run app with mysql database in container:

1. RUN - git clone https://github.com/IrynaKosenko/nestjs.git
2. RUN - npm install
3. Create .env file or link - https://drive.google.com/file/d/15joV0M8okgM7NxS0sjwLhop4CrC-8CxG/view?usp=sharing
4. RUN - docker compose -f docker-compose.yml up -d
5. RUN - npm run migration:run - two files located in the "database/migration" will be run: one to create the tables, the other to populate the tables with data from swapi.
6. Run application: "npm run start:dev"
7. Follow the link <http://localhost:3001/api> in browser.

phpAdmin for database management on http://localhost:8082
- server - mysqldb
- user - userStarwars
- password - test

--------------------------------------------------------------------------------------------

## Для виконання е2е тестів:

1. Stop application
2. Change the value of the SCOPE variable in the .env file to "testing".
3. Run the command "npm run migrationtest:run" will run the table creation file located in the "database/test/migration" folder
4. Run application "npm run start:dev". In the main.ts, the fetchAndFillTablesTestDatabase() method will be called to fill the tables with data. Wait a minute or two until all the tables are filled.
5. Run the command "npm run test:e2e test/planet.e2e-spec.ts" to run the test.

phpAdmin for test database management on http://localhost:8082
- server - testdb
- user - userTest
- password - test

-----------------------------------------------------------------------------------

# Run application and databases in docker containers:

1. Download and add to the project .env file - <https://drive.google.com/drive/folders/1N6WVxr4SUR4RGe2isGn2YPNptra8US7u?usp=sharing>
2. Download 'docker-compose.image.yml' file from Github repository: <https://github.com/IrynaKosenko/nestjs>
3. RUN - docker compose -f docker-compose.image.yml up -d

You might get an error: Error during Data Source initialization Error: connect ECONNREFUSED
then you need to enter into the docker terminal and run migrations:

docker exec -it starwars bash
run migrations  -  "npm run migration:run"

Restart containers.

In browser follow the link <http://localhost:3001/api>

phpAdmin for database management on http://localhost:8081
- server - mysql-db
- user - userStarwars
- password - test
