# D8 Assessment

This project is maintained using Composer and built on [Silverback](https://github.com/AmazeeLabs/silverback).

For Drupal+Composer related information see:
- https://github.com/drupal-composer/drupal-project
- https://www.drupal.org/node/2471553
- https://github.com/AmazeeLabs/d8-starter-composer#readme

## Project Setup

There are two ways to run the project:
1. `Docker with Lagoon`
   - pros: the environment is exactly the same to real dev/prod environments
   - cons: if you are not on Linux, the speed is not so good
2. `Local PHP server`
   - pros: speed
   - cons:
     - local env can be tricky to setup
     - the environment is not the same to real dev/prod environments
     - it's not possible to sync dev/prod database to local (because on dev/prod envs it's MySQL/MariaDB, but locally it's SQLite)

Which one to use? `Docker with Lagoon` is the most reliable way to develop. `Local PHP server` is currently used for running automated testing. Use both depending on the situation.

### Docker with Lagoon

- Prerequisites
  - Make sure you have [PHP7](http://php.net/manual/en/install.php) installed  
  `php --version`
  - Make sure you have [Composer](https://getcomposer.org/) installed  
  `composer --version`
- Setup
  - Install dependencies  
  `composer install`
  - Start [Docker](https://www.docker.com)
  - Start [Pygmy](https://docs.amazee.io/local_docker_development/pygmy.html)  
  `pygmy up`
  - Build the containers  
  `docker-compose build`  
  (you need to run this only once, but you may need to re-run it if there are changes to Lagoon setup)
  - Start the containers  
  `docker-compose up -d`  
  - SSH into the `cli` container  
  `docker-compose exec cli bash`
  - Install a minimal database  
  `drush si -y minimal --sites-subdir=default --config-dir=../config/sync --account-name=admin --account-pass=admin`
  - Build webpack libraries  
  `drush webpack:build`

### Local PHP server

- Prerequisites
  - Make sure you have installed and configured [direnv](https://direnv.net/) (don't forget about the [setup](https://direnv.net/index.html#setup) for your shell). Here is how it should look in case of a correct installation:  
    ```
    me@local:~/Workspace $ cd zhinst/
    direnv: error .envrc is blocked. Run `direnv allow` to approve its content.
    me@local:~/Workspace/zhinst $ direnv allow
    direnv: loading .envrc
    direnv: export +CYPRESS_BASE_URL ... +SB_TEST_CONTENT ~PATH
    me@local:~/Workspace/zhinst $ cd ..
    direnv: unloading
    me@local:~/Workspace $ cd zhinst/
    direnv: loading .envrc
    direnv: export +CYPRESS_BASE_URL ... +SB_TEST_CONTENT ~PATH
    ```
  - Make sure you have [PHP7](http://php.net/manual/en/install.php) meeting [Drupal requirements](https://www.drupal.org/docs/8/system-requirements/php-requirements) installed  
  `php --version`
  - Make sure you have [Composer](https://getcomposer.org/) installed  
  `composer --version`
- Setup
  - Install dependencies  
  `composer install`
  - When switching to the project root for the first time, you should see this:  
  ``direnv: error .envrc is blocked. Run `direnv allow` to approve its content.``
  - Run `direnv allow` (it will copy `.env.example` to `.env`, and load env vars)
  - Run `silverback setup` to initialize SQLite database and install Drupal from the existing configuration. This has to be done at least once. If there are issues with the command, try to run `silverback clear-cache` first.
  - Run `drush webpack:build` to build libraries
  - Start the webserver with `drush serve`

