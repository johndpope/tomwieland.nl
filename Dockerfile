FROM node:6.2

RUN npm i -g yarn

EXPOSE 3000

#ENV DOCKERIZE_VERSION v0.2.0
#RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN mkdir -p /service

ADD . /service
WORKDIR /service
RUN yarn

#CMD dockerize -wait tcp://db:27017 ./node_modules/.bin/gulp production
CMD ./node_modules/.bin/gulp production
