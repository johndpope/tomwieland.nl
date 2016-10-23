FROM node:6.2

EXPOSE 3000
EXPOSE 8080
#EXPOSE 5858

ENV DOCKERIZE_VERSION v0.2.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Next line is temporary for development
#ADD node_modules /tmp
#ADD package.json /tmp
#WORKDIR /tmp
#RUN npm install
#RUN rm /tmp/package.json
#RUN mv /tmp/node_modules /service

RUN mkdir -p /service

#ADD node_modules /service
#WORKDIR /service
#RUN npm install

WORKDIR /service
ADD . /service

#CMD dockerize -wait tcp://db:27017 npm start
CMD npm start
