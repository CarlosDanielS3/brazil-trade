FROM node:17-alpine 

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 9876

CMD ["npm", 'run',"start:dev"]