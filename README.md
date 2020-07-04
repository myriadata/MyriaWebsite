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

## Commits

### Commit Message Format
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
```

### Type

Must be one of the following :
- **build** : Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci** : Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- **docs** : Documentation only changes
- **feat** : A new feature
- **fix** : A bug fix
- **perf** : A code change that improves performance
- **refactor** : A code change that neither fixes a bug nor adds a feature
- **style** : Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test** : Adding missing tests or correcting existing tests

### Scope

Scope is to provide the context. Actual contexts are :
- **GLOBAL** : for anything about technical needs 
- **WELCOME** : about landing page 

### Subject

Subject is require and has to be shorter than 50 caracters. It is an overview of what commit doing.

### Body

Body is optional, it can be multiline, and it is not size limited.

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

