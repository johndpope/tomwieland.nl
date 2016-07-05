# Use exathe latest nodejs version.
FROM node:6.2

# Expose the port.
EXPOSE 80

# Set environment variables.
ENV PORT=80

# Create the application directory in the dock.
RUN mkdir /opt/service

# Add all the files to the container.
ADD . /opt/service/

# Change the working directory.
WORKDIR /opt/service

# Install all the dependencies.
RUN npm install

# Run the app.
CMD node /opt/service/index.js
