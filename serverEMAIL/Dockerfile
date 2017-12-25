FROM node:carbon
WORKDIR /usr/src/app/service
COPY src ./src
COPY config ./config
COPY database.json ./
COPY server.js ./
COPY package.json ./
RUN npm install
RUN mkdir ../common-utils
COPY common-utils ../common-utils

EXPOSE 3600
CMD ["node", "server.js"]