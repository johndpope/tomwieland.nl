FROM node:7

# Expose ports.
EXPOSE 4001

# Ensure the project directory.
RUN mkdir -p /service

# Set the working directory to there.
WORKDIR /service

# Add the package.json file.
ADD ./package.json /service

# Install dependencies.
RUN npm install

# Add all files.
ADD . /service

# Run the service.
CMD node /service/index.js

# Dockerize if you want to wait for a socket to connect
#ENV DOCKERIZE_VERSION v0.2.0
#RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
#CMD dockerize -wait tcp://db:27017 ./node_modules/.bin/gulp production
