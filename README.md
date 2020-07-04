# MyriaWebsite
MyriaData Website

## Getting Started
To launch app on http://localhost:8080
```
npm install
npm run start
```

## Update dependencies
```
npm audit fix
npm update
npm outdated
```

Circleci/node docker image version must be upgraded too. 
This docker image is used by CircleCI to compile the application. 
Version is specified into .circleci/config.yml.

## Build
Two build processes exists. Represented two files in config directory (dev and prod).
Warn to update this two files if it is necessary to update build process.

To build:
```
npm run build:dev
npm run build:package
```

## Deploy
Deployment is managed by CircleCI.
You just have to merge branches to master branch to launch deployment on production environment :)

