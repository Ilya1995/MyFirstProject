FROM node:carbon
WORKDIR /usr/src/app/service
COPY src ./src
COPY config ./config
COPY migrations ./migrations
COPY database.json ./
COPY server.js ./
COPY package.json ./
RUN npm install
RUN mkdir ../common-utils
COPY common-utils ../common-utils

EXPOSE 4000
CMD ["node", "server.js"]