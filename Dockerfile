FROM docker.io/node:10.15-alpine

WORKDIR /app/trapts

COPY . /app/trapts

RUN npm i

RUN npm run rabbit:receive

EXPOSE 4000

CMD npm run dev
