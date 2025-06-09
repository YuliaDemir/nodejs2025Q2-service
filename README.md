# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## INSTALATION 

### 1. Downloading

```
git clone https://github.com/YuliaDemir/nodejs2025Q2-service.git
cd nodejs2025Q2-service
```

### 2. Moving to the development branch

```
git checkout dev2
```

## RUNNING application

### 1. Launch your docker app

### 2. Assemble and launch the containers

```
docker-compose up --build
```

After starting the app on port (4000 as default) you can open

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
