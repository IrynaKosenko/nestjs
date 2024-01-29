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

Download the project from Github:

1. git init
2. git clone https://github.com/IrynaKosenko/nestjs
3. npm install
4. create .env file or link - <https://drive.google.com/file/d/1FKadu1gWTlJo1CIVjpT7jgnshr0iGFL3/view?usp=sharing>
5. RUN docker-compose -f docker-compose.yml up -d
6. If you get an error :
Create new user in docker container terminal where was run mysql DB: 
mysql -u root -p
enter password: root
CREATE USER 'swapi'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'swapi'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
Аnd repeat all operations for testing database ( 'test-container' container, for 'swapi-test') if its need

7. Командою - npm run migration:run - запустяться два файли, що лежать в папці database/migration, одна - для створення таблиць, друга - для заповнення таблиць даними зі swapi.
8. Run application: "npm run start:dev"
9. Follow the link <http://localhost:3001/api> in browser.

phpAdmin for database management on http://localhost:8082
- server - mysqldb
- user - swapi
- password - root

---------------------------------------------------------------------------------------------------------------

# Для виконання е2е тестів:
1. Зупинити програму

2. Змінити значення змінної SCOPE в файлі .env на "testing".

4. Виконати команду "npm run migrationtest:run". запуститься файл для створення таблиць, що лежить в папці database/test/migration

5. Запустити додаток "npm run start:dev". В файлі main.ts буде викликаний метод fetchAndFillTablesTestDatabase() для заповнення таблиць даними.Почекати одну-дві хвилини поки всі таблиці заповняться.

6. Запустити команду "npm run test:e2e test/planet.e2e-spec.ts" для запуску тесту.

--------------------------------------------------------------------------------------------------------------

# Run application and databases in containers:

Download and add to the project .env.image file - <https://drive.google.com/file/d/1fYeXNbVhzQjLiFhUQ-NVqxNLrRsSC16o/view?usp=sharing>

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