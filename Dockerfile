# Use exathe latest nodejs version.
FROM node:6.2

# Create the application directory in the dock.
RUN mkdir /opt/service

# Add all the files to the container.
ADD . /opt/service/

# Change the working directory.
WORKDIR /opt/service

# Install all the dependencies.
RUN npm install

# Expose the port.
EXPOSE 3000

# Run the app.
CMD node /opt/service/index.js
