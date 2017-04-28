# Gulp Starter on Docker

This extra allows you to run gulp-starter in a Docker container. You can use the included development server, or use Docker to manage assets for another server environment, which may or may not also use Docker. 

## Requirements

Requires [Docker](https://www.docker.com/products/overview), naturally.

## Usage

### In development
```bash
git clone https://github.com/vigetlabs/gulp-starter.git MyApp
cd MyApp
cp ./extras/docker/Dockerfile .
cp ./extras/docker/.dockerignore .
docker build -t myapp .
docker run -it --rm \
    -v "$PWD"/src:/app/src \
    -v "$PWD"/public:/app/public \
    -p 3000:3000 \
    myapp \
    npm start
```
Browse to [http://localhost:3000](http://localhost:3000).

### As part of an automated build
```bash
docker run --rm myrepo/myimage:mytag npm run gulp production
```

If you want to use this to process front-end assets for a different server environment, you can do that too. In the Browsersync section of [config.json](https://github.com/davidham/gulp-starter/blob/master/gulpfile.js/config.json), set Browsersync to proxy your app server. Here's an example pointing at a Rails app:

```json
"browserSync": {
  "proxy": "http://app:3000",
  "ghostMode": false,
  "port": "8080",
  "ui": {
    "port": "8081"
  },
  "files": "./app/views/**/*"
}
```

In this example `app` is the name of the Rails service from a `docker-compose.yml` file (sold separately).
