FROM node:7

# Expose ports.
EXPOSE 3000

# Ensure Yarn is installed.
RUN npm i -g yarn

# Ensure the project directory.
RUN mkdir -p /service

# Set the working directory to there.
WORKDIR /service

# Add the package.json file.
ADD ./package.json /service
ADD ./yarn.lock /service

# Install dependencies.
RUN yarn

# Add all files.
ADD ./.babelrc /service
ADD ./.bootstraprc /service
ADD ./.eslintrc /service
ADD ./gulpfile.js /service
ADD ./knexfile.js /service
ADD ./webpack.config.js /service

# Add directories.
ADD ./src /service
ADD ./gulp /service

# Run the service.
#CMD npm run develop
ENTRYPOINT /service/node_modules/.bin/gulp develop

# Dockerize if you want to wait for a socket to connect
#ENV DOCKERIZE_VERSION v0.2.0
#RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
#CMD dockerize -wait tcp://db:27017 ./node_modules/.bin/gulp production
