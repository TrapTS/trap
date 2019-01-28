FROM docker.io/node:10.15-alpine

RUN mkdir /home/trap
WORKDIR /home/trap
ADD . /home/trap
RUN cd /home/trap && npm install -g yarn && yarn

EXPOSE 4000

CMD yarn run dev
