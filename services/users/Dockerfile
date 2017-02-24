# Use the Node.js container
FROM node:7

# Install package dependencies.
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install -y build-essential
RUN apt-get install -y libsasl2-dev

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
