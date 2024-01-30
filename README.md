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

---------------------------------------------------------------------------------------------------------------

# Download the project from Github:

Run for the first time:
1. RUN - git init
2. RUN - git clone https://github.com/IrynaKosenko/nestjs.git
3. RUN - npm install
4. Create .env file or link - https://drive.google.com/drive/folders/1CaxIt4PGPDIZFikIpmqRATfVMePgeAA8?usp=drive_link
5. RUN - docker-compose -f docker-compose.yml up -d
6. RUN - npm run migration:run - запустяться два файли, що лежать в папці database/migration, одна - для створення таблиць, друга - для заповнення таблиць даними зі swapi.
7. Run application: "npm run start:dev"
8. Follow the link <http://localhost:3001/api> in browser.

phpAdmin for database management on http://localhost:8082
- server - mysqldb
- user - userStarwars
- password - test

---------------------------------------------------------------------------------------------------------------

# Для виконання е2е тестів:
1. Stop application

2. Change the value of the SCOPE variable in the .env file to "testing".

4. Run the command "npm run migrationtest:run" will run the table creation file located in the "database/test/migration" folder

5. Run application "npm run start:dev". In the main.ts, the fetchAndFillTablesTestDatabase() method will be called to fill the tables with data. Wait a minute or two until all the tables are filled.

6. Run the command "npm run test:e2e test/planet.e2e-spec.ts" to run the test.

phpAdmin for test database management on http://localhost:8082
- server - testdb
- user - userTest
- password - test

--------------------------------------------------------------------------------------------------------------

# Run application and databases in containers:

Download and add to the project .env file - <https://drive.google.com/file/d/1lldbCYgM7Wvgb51MYzNOR-VFBAIEP_B9/view?usp=sharing>

Download docker-compose.image.yml file from Github repository: <https://github.com/IrynaKosenko/nestjs>
RUN docker-compose -f docker-compose.image.yml up

IF you get an error - restart all containers.

docker exec -it starwars bash
and run migrations  -  "npm run migration:run"
and for testing database - "npm run migrationtest:run"

In browser follow the link <http://localhost:3001/api>

phpAdmin for database management on http://localhost:8081
- server - mysql-db
- user - root
- password - root
