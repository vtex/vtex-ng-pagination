# Vtex Ng Pagination

A pagination module forn angular.

Requires [node](http://nodejs.org/), [grunt](http://gruntjs.com/) (`npm i -g grunt-cli`) and [bower](http://bower.io/) (`npm install -g bower`).

### Speedstart

    npm i
    grunt

Have fun! Changes to your coffee, less or html files will reload the page automatically. Nice.

The compiled files can be found in the `/build` folder.

### Production build

    grunt prod

### Deployment build

    DEPLOY_ENV=beta GIT_COMMIT=`git rev-parse --verify HEAD` grunt deploy

Have a look at the newly created deploy/spdbg-01-00-00-1-stable/index.html file.

### Folder structure

- `src` - most of your files will be here.
- `spec` - Unit tests source files.
- `Gruntfile.coffee` - This is the configuration file for grunt. Contains all the build tasks.
- `build` - this folder will be created after you run a grunt task.

------

VTEX - 2013