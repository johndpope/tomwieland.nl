# tomwieland.nl

This documentation is out of date for the development branch..

## 1. Installation

### 1.1 Prerequisites
TODO: List versions
- Docker Engine
- Docker Compose

### 1.2 Clone Repository
```
git clone git@github.com:Industrial/tomwieland.nl.git
cd tomwieland.nl
```

### 1.3 Development
```
./bin/develop
```

### 1.4 Production
```
./bin/production
```

## 1.5 Live deployment
Use a CI platform that supports docker.
- Travis CI (https://docs.travis-ci.com/user/docker/#Pushing-a-Docker-Image-to-a-Registry)

Use a cloud platform.
- Heroku (https://devcenter.heroku.com/articles/container-registry-and-runtime#using-a-ci-cd-platform)

#### 1.5.1 DigitalOcean
- Create a an Ubuntu droplet
- Install dokku
  ```
  wget https://raw.githubusercontent.com/dokku/dokku/v0.7.2/bootstrap.sh
  sudo DOKKU_TAG=v0.7.2 bash bootstrap.sh
  ```
- Configure SSH keys (go to droplet IP in browser)
