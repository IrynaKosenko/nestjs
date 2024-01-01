FROM node

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3005

CMD [ "npm", "run", "start:dev" ]

# services:
#   mysql:
#     image: mysql
#     container_name: mysql
#     command: --default-authentication-plugin=mysql_native_password
#     ports:
#       - ${MYSQL_PORT}:${MYSQL_PORT}
#     networks:
#       - star-wars-network
#     mem_limit: 512m
#     mem_reservation: 512m
#     environment:
#       MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
#       MYSQL_USER: ${MYSQL_USERNAME}
#       MYSQL_PASSWORD: ${MYSQL_PASSWORD}
#       MYSQL_DATABASE: ${MYSQL_DATABASE}
#     volumes:
#       - star-wars-data:/var/lib/mysql
#     restart: always

#   star-wars-app:
#     image: star-wars-app
#     container_name: star-wars-app
#     build: .
#     ports:
#       - ${APP_PORT}:${APP_PORT}
#     networks:
#       - star-wars-network
#     environment:
#       MYSQL_HOST: ${MYSQL_HOST}
#       MYSQL_PORT: ${MYSQL_PORT}
#       MYSQL_USER: ${MYSQL_USERNAME}
#       MYSQL_PASSWORD: ${MYSQL_PASSWORD}
#       MYSQL_DATABASE: ${MYSQL_DATABASE}
#     depends_on:
#       - mysql
#     restart: always

# networks:
#   star-wars-network:
#     driver: bridge

# volumes:
#   star-wars-data:
#     driver: local
#
#
