FROM node:20

WORKDIR /project
COPY .  .

RUN npm install

CMD ["npm","start"]