# tomwieland.nl

## Installation

### Prerequisites
TODO: List versions
- Docker Engine
- Docker Compose

### Clone Repository
```
git clone git@github.com:Industrial/tomwieland.nl.git
cd tomwieland.nl
```

### Development
```
./bin/develop
```

### Production
```
./bin/production
```

## Live deployment
Use a CI platform that supports docker.
- Travis CI (https://docs.travis-ci.com/user/docker/#Pushing-a-Docker-Image-to-a-Registry)

Use a cloud platform.
- Heroku (https://devcenter.heroku.com/articles/container-registry-and-runtime#using-a-ci-cd-platform)

### DigitalOcean
- Create a an Ubuntu droplet
- Install dokku
  ```
  wget https://raw.githubusercontent.com/dokku/dokku/v0.7.2/bootstrap.sh
  sudo DOKKU_TAG=v0.7.2 bash bootstrap.sh
  ```
- Configure SSH keys (go to droplet IP in browser)
